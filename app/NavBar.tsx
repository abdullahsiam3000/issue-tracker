'use client'

import classNames from 'classnames'

import { Box } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PiBugBeetleLight } from 'react-icons/pi'

const NavBar = () => {
  const currentPath = usePathname()
  const { status, data: session } = useSession()

  const links = [
    {
      label: 'Dashboard',
      href: '/',
    },
    {
      label: 'Issues',
      href: '/issues',
    },
  ]

  return (
    <nav className='mb-2 flex h-14 items-center justify-between gap-6 border-b px-4'>
      <Link href={'/'}>
        <PiBugBeetleLight size={'2rem'} className='text-zinc-500' />
      </Link>
      <ul className='flex gap-4'>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classNames('transition-colors hover:text-zinc-800', {
                'text-zinc-900': currentPath.split('/')[1] === link.href.split('/')[1],
                'text-zinc-400': currentPath !== link.href,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === 'authenticated' && <Link href={'/api/auth/signout'}>Logout</Link>}{' '}
        {status === 'unauthenticated' && <Link href={'/api/auth/signin'}>Login</Link>}
      </Box>
    </nav>
  )
}

export default NavBar
