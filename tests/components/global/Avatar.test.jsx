import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Avatar from '@/components/global/Avatar'


// mock Image
vi.mock('@components/global/Image', () => ({
  default: ({ src, ...props }) => <img src={src} {...props} />,
}))


// mock bgColors (to make deterministic)
vi.mock('@/static/adminData', () => ({
  bgColors: ['bg-red', 'bg-blue', 'bg-green'],
}))

describe('Avatar', () => {
  const baseData = {
    complaint: {
      name: 'John Doe',
      image: null,
    },
    section: 1,
  }

  it('should render image when complaint.image exists', () => {
    render(
      <Avatar
        data={{
          ...baseData,
          complaint: { ...baseData.complaint, image: 'test.png' },
        }}
      />
    )

    expect(screen.getByTestId('image')).toBeInTheDocument()
  })

  it('should render initials when no image', () => {
    render(<Avatar data={baseData} />)

    const avatar = screen.getByTestId('customizedAvatar')

    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveTextContent('J D')
  })

  it('should handle single name correctly', () => {
    render(
      <Avatar
        data={{
          ...baseData,
          complaint: { name: 'John', image: null },
        }}
      />
    )

    expect(screen.getByTestId('customizedAvatar')).toHaveTextContent('J')
  })

  it('should apply section 1 style (bg-sidebar)', () => {
    render(
      <Avatar
        data={{
          ...baseData,
          section: 1,
        }}
      />
    )

    expect(screen.getByTestId('customizedAvatar')).toHaveClass('bg-sidebar')
  })

  it('should apply section 2 style (bg-primary)', () => {
    render(
      <Avatar
        data={{
          ...baseData,
          section: 2,
        }}
      />
    )

    expect(screen.getByTestId('customizedAvatar')).toHaveClass('bg-primary')
  })

  it('should apply random bg color for section 3', () => {
    render(
      <Avatar
        data={{
          ...baseData,
          section: 3,
        }}
      />
    )

    const avatar = screen.getByTestId('customizedAvatar')

    // since random, just check one of possible values
    expect(
      ['bg-red', 'bg-blue', 'bg-green'].some((cls) =>
        avatar.className.includes(cls)
      )
    ).toBe(true)
  })
})