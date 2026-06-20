'use client'

import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { localizePath } from '@/lib/localizePath'
import { useLocale } from '@/lib/useLocale'

type LinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
  children: ReactNode
}

export function LocaleLink({ href, children, ...rest }: LinkProps) {
  const { locale } = useLocale()
  return (
    <Link href={localizePath(href, locale)} {...rest}>
      {children}
    </Link>
  )
}
