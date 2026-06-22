import { spawn } from 'child_process';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { maxStocks?: number };
    const maxStocks = body.maxStocks ?? 100;

    const scriptPath = path.join(process.cwd(), 'scripts', 'screener.py');

    const result = await new Promise<string>((resolve, reject) => {
      const python = spawn('python', [scriptPath, String(maxStocks)]);
      let stdout = '';
      let stderr = '';

      python.stdout.on('data', (data: Buffer) => {
        stdout += data.toString();
      });

      python.stderr.on('data', (data: Buffer) => {
        stderr += data.toString();
      });

      python.on('close', (code: number | null) => {
        if (code !== 0) {
          reject(new Error(stderr || `Python script exited with code ${code}`));
        } else {
          resolve(stdout);
        }
      });

      python.on('error', (err: Error) => {
        reject(err);
      });
    });

    const signals = JSON.parse(result) as Array<{
      ticker: string;
      timeframe: string;
      signal_date: string;
      close: number | null;
    }>;

    return NextResponse.json({ signals });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
