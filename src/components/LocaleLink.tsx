'use client'

import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { localizePath } from '@/lib/localizePath'

type LinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
  children: ReactNode
}

export function LocaleLink({ href, children, ...rest }: LinkProps) {
  return (
    <Link href={localizePath(href)} {...rest}>
      {children}
    </Link>
  )
}
