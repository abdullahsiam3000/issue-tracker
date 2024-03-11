'use client'

import classNames from 'classnames'

import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PiBugBeetleLight } from 'react-icons/pi'
import { Skeleton } from '@/app/components'
const NavBar = () => {
  return (
    <nav className='mb-2  border-b px-4 py-3'>
      <Container>
        <Flex align={'center'} justify={'between'}>
          <Flex align={'center'} gap={'3'}>
            <Link href={'/'}>
              <PiBugBeetleLight size={'2rem'} className='text-zinc-500' />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  )
}

const AuthStatus = () => {
  const { status, data: session } = useSession()
  if (status === 'loading') return <Skeleton width='3rem' />
  if (status === 'unauthenticated') return <Link href={'/api/auth/signin'}>Login</Link>

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            fallback='?'
            src={session!.user!.image!}
            size={'2'}
            radius='full'
            className='cursor-pointer'
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size={'3'}>{session!.user?.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href={'/api/auth/signout'}>Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}

const NavLinks = () => {
  const currentPath = usePathname()

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
  )
}

export default NavBar
