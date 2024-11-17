'use client'

import { useState } from 'react'
import {
  Bell,
  ChevronDown,
  Globe,
  LayoutGrid,
  Link2,
  LogOut,
  Menu,
  MessageSquare,
  Pencil,
  Search,
  Settings,
  Trash2,
  Users,
  X
} from 'lucide-react'
import Image from 'next/image'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'

type AnalyticsData = {
  name: string
  leads: number
  campaign: number
}

type Campaign = {
  name: string
  platform: string
  date: string
  leads: string
}

type Lead = {
  name: string
  email: string
  image: string
}

const analyticsData: AnalyticsData[] = [
  { name: 'Feb', leads: 32000, campaign: 28000 },
  { name: 'Mar', leads: 34000, campaign: 29000 },
  { name: 'Apr', leads: 36000, campaign: 31000 },
  { name: 'May', leads: 42000, campaign: 35000 },
  { name: 'Jun', leads: 45591, campaign: 38000 },
  { name: 'Jul', leads: 43000, campaign: 36000 },
  { name: 'Aug', leads: 44000, campaign: 37000 },
  { name: 'Sep', leads: 45000, campaign: 38000 },
  { name: 'Oct', leads: 47000, campaign: 40000 },
  { name: 'Nov', leads: 48000, campaign: 41000 },
  { name: 'Dec', leads: 49000, campaign: 42000 },
  { name: 'Jan', leads: 51000, campaign: 44000 }
]

const campaigns: Campaign[] = [
  { name: 'Catalog', platform: 'Facebook', date: 'Oct, 29, 2023', leads: '12' },
  { name: 'Catalog', platform: 'Google ad', date: 'Oct, 29, 2023', leads: '2' },
  { name: 'Catalog', platform: 'Radio', date: 'Oct, 29, 2023', leads: '20' },
  { name: 'Catalog', platform: 'TV', date: 'Oct, 29, 2023', leads: '30' }
]

const recentLeads: Lead[] = [
  {
    name: 'Jenny Wilson',
    email: 'w.lawson@example.com',
    image: '/download.jpeg'
  },
  {
    name: 'Devon Lane',
    email: 'dat.roberts@example.com',
    image: '/picture.jpeg'
  },
  { name: 'Jane Cooper', email: 'jgraham@example.com', image: '/local.jpeg' },
  {
    name: 'Dianne Russell',
    email: 'curtis.d@example.com',
    image: '/release.jpeg'
  }
]

export default function Dashboard () {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTimeframe, setActiveTimeframe] = useState('Monthly')

  return (
    <div className='flex min-h-screen bg-[#F8F9FA]'>
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-[#1C2434] text-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex h-full flex-col justify-between p-6'>
          <div>
            <div className='flex items-center justify-between'>
              <Image
                src='/brand.png'
                alt='bouletteproof'
                width={150}
                height={40}
                className='mb-8 object-contain'
                priority
              />
              <Button
                variant='ghost'
                size='icon'
                className='text-white hover:bg-[#2E3A50] lg:hidden'
                onClick={() => setSidebarOpen(false)}
              >
                <X className='h-6 w-6' />
                <span className='sr-only'>Close sidebar</span>
              </Button>
            </div>
            <nav className='space-y-2'>
              <a
                href='#'
                className='flex items-center gap-3 rounded-lg bg-[#2E3A50] px-3 py-2.5 text-[15px]'
              >
                <LayoutGrid className='h-[18px] w-[18px] text-[#4AC7EC]' />
                <span>Dashboard</span>
              </a>
              <a
                href='#'
                className='flex items-center gap-3 px-3 py-2.5 text-[15px] text-gray-400 hover:text-white'
              >
                <MessageSquare className='h-[18px] w-[18px]' />
                <span>Campaigns</span>
              </a>
              <a
                href='#'
                className='flex items-center gap-3 px-3 py-2.5 text-[15px] text-gray-400 hover:text-white'
              >
                <Users className='h-[18px] w-[18px]' />
                <span>Leads</span>
              </a>
              <a
                href='#'
                className='flex items-center gap-3 px-3 py-2.5 text-[15px] text-gray-400 hover:text-white'
              >
                <Globe className='h-[18px] w-[18px]' />
                <span>Website Analytics</span>
              </a>
            </nav>
          </div>
          <nav className='space-y-2'>
            <a
              href='#'
              className='flex items-center gap-3 px-3 py-2.5 text-[15px] text-gray-400 hover:text-white'
            >
              <MessageSquare className='h-[18px] w-[18px]' />
              <span>Support</span>
            </a>
            <a
              href='#'
              className='flex items-center gap-3 px-3 py-2.5 text-[15px] text-gray-400 hover:text-white'
            >
              <Settings className='h-[18px] w-[18px]' />
              <span>Settings</span>
            </a>
            <a
              href='#'
              className='flex items-center gap-3 px-3 py-2.5 text-[15px] text-gray-400 hover:text-white'
            >
              <LogOut className='h-[18px] w-[18px]' />
              <span>Logout</span>
            </a>
          </nav>
        </div>
      </aside>

      <div className='flex-1 lg:ml-64'>
        <header className='sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6'>
          <Button
            variant='ghost'
            size='icon'
            className='lg:hidden'
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className='h-6 w-6' />
            <span className='sr-only'>Open sidebar</span>
          </Button>
          <div className='flex flex-1 items-center'>
            <div className='relative hidden sm:block w-1/2'>
              <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
              <Input
                className='h-10 w-full rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm placeholder:text-gray-500'
                placeholder='Type to search'
              />
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  size='sm'
                  className='h-9 gap-1 rounded-full border-gray-200 px-3 text-xs font-medium'
                >
                  EN
                  <ChevronDown className='h-3 w-3 text-gray-500' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='end'
                className='w-24 rounded-xl bg-white'
              >
                <DropdownMenuItem className='rounded-lg'>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem className='rounded-lg'>
                  French
                </DropdownMenuItem>
                <DropdownMenuItem className='rounded-lg'>
                  German
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant='ghost'
              size='icon'
              className='relative h-10 w-10 rounded-full bg-[#1C2434] hover:bg-gray-500'
            >
              <Bell className='h-5 w-5 text-white hover:text-gray-200' />
              <span className='absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white'>
                4
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  className='h-9 gap-2 rounded-full px-2 text-sm font-medium bg-[#1C2434] hover:bg-gray-500'
                >
                  <Avatar className='h-7 w-7'>
                    <AvatarImage
                      src='/profile.jpeg'
                      alt='Lilian Smith'
                      className='object-cover'
                    />
                    <AvatarFallback>LS</AvatarFallback>
                  </Avatar>
                  <span className='text-white'>Lilian Smith</span>
                  <ChevronDown className='h-4 w-4 text-white' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='end'
                className='w-56 rounded-xl bg-white p-1'
              >
                <DropdownMenuItem className='rounded-lg'>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className='rounded-lg'>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className='rounded-lg'>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className='p-6'>
          <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <h1 className='text-2xl font-semibold'>
              Hey Lilian -{' '}
              <span className='text-gray-400'>
                here's what's happening today
              </span>
            </h1>
            <div className='flex gap-3'>
              <Button
                variant='outline'
                className='h-10 rounded-full border-[#00B8D9] px-4 text-[#00B8D9] hover:bg-[#00B8D9]/5'
              >
                Add Website
              </Button>
              <Button className='h-10 rounded-full bg-[#00B8D9] px-4 text-white hover:bg-[#00B8D9]/90'>
                Add Campaign
              </Button>
            </div>
          </div>

          <div className='mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            <Card className='overflow-hidden rounded-xl bg-[#1C2434] shadow-sm'>
              <CardContent className='p-6'>
                <h3 className='mb-4 text-xs font-medium uppercase tracking-wider text-gray-400'>
                  Number of leads
                </h3>
                <div className='flex items-center justify-between'>
                  <span className='text-3xl font-bold text-white'>2,048</span>
                  <span className='text-sm font-medium text-red-500'>- 0%</span>
                </div>
              </CardContent>
            </Card>
            <Card className='overflow-hidden rounded-xl bg-[#1C2434] shadow-sm'>
              <CardContent className='p-6'>
                <h3 className='mb-4 text-xs font-medium uppercase tracking-wider text-gray-400'>
                  Number of campaigns
                </h3>
                <div className='flex items-center justify-between'>
                  <span className='text-3xl font-bold text-white'>123</span>
                  <span className='text-sm font-medium text-[#2fc441]'>
                    + 0%
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className='overflow-hidden rounded-xl bg-[#1C2434] shadow-sm'>
              <CardContent className='p-6'>
                <h3 className='mb-4 text-xs font-medium uppercase tracking-wider text-gray-400'>
                  Number of websites
                </h3>
                <div className='flex items-center justify-between'>
                  <span className='text-3xl font-bold text-white'>12</span>
                  <span className='text-sm font-medium text-[#30d857]'>
                    + 0%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className='mb-6 overflow-hidden rounded-xl bg-white shadow-sm'>
            <CardContent className='p-8'>
              <div className='mb-8 flex flex-wrap items-center justify-between gap-4'>
                <div>
                  <h3 className='text-xl font-semibold text-gray-900'>
                    Analytics
                  </h3>
                  <div className='mt-3 flex items-center gap-8'>
                    <div className='flex items-center gap-2'>
                      <span className='h-3 w-3 rounded-full bg-[#00B8D9]' />
                      <span className='text-sm font-medium text-gray-600'>
                        Leads
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='h-3 w-3 rounded-full bg-[#2fc441]' />
                      <span className='text-sm font-medium text-gray-600'>
                        Campaign
                      </span>
                    </div>
                  </div>
                </div>
                <div className='flex gap-3'>
                  {['Daily', 'Monthly', 'Yearly'].map(timeframe => (
                    <Button
                      key={timeframe}
                      variant='outline'
                      size='sm'
                      className={`h-10 rounded-lg border px-6 text-sm font-medium transition-colors ${
                        activeTimeframe === timeframe
                          ? 'border-[#00B8D9] bg-[#00B8D9]/5 text-[#00B8D9]'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTimeframe(timeframe)}
                    >
                      {timeframe}
                    </Button>
                  ))}
                </div>
              </div>
              <div className='h-[350px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart
                    data={analyticsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid
                      strokeDasharray='3 3'
                      vertical={false}
                      stroke='#E5E7EB'
                      opacity={0.3}
                    />
                    <XAxis
                      dataKey='name'
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                      dy={10}
                      padding={{ left: 20, right: 20 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                      dx={-10}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className='rounded-lg border border-gray-100 bg-white p-4 shadow-lg'>
                              <p className='mb-1 text-sm text-gray-500'>
                                {payload[0].payload.name}
                              </p>
                              <p className='text-lg font-semibold text-gray-900'>
                                {payload[0].value.toLocaleString()}
                              </p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Line
                      type='monotone'
                      dataKey='leads'
                      stroke='#00B8D9'
                      strokeWidth={3}
                      dot={false}
                      activeDot={{
                        r: 8,
                        fill: '#00B8D9',
                        strokeWidth: 0
                      }}
                    />
                    <Line
                      type='monotone'
                      dataKey='campaign'
                      stroke='#2fc441'
                      strokeWidth={3}
                      dot={false}
                      activeDot={{
                        r: 8,
                        fill: '#2fc441',
                        strokeWidth: 0
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className='mb-6 grid gap-6 lg:grid-cols-3'>
            <Card className='overflow-hidden rounded-xl bg-white shadow-sm lg:col-span-2'>
              <CardContent className='p-6'>
                <div className='mb-6 flex items-center justify-between'>
                  <h3 className='text-lg font-semibold'>Recent Campaigns</h3>
                  <Button
                    variant='ghost'
                    className='text-sm font-normal text-[#00B8D9] hover:text-[#00B8D9]/90'
                  >
                    See All Campaigns
                  </Button>
                </div>
                <div className='overflow-x-auto'>
                  <table className='w-full'>
                    <thead>
                      <tr className='border-b border-gray-100'>
                        <th className='pb-4 pr-8'>
                          <Checkbox className='rounded-sm border-gray-300' />
                        </th>
                        <th className='pb-4 pr-8 text-left'>
                          <div className='flex items-center gap-2'>
                            <span className='text-sm font-medium text-gray-500'>
                              Name
                            </span>
                            <ChevronDown className='h-4 w-4 text-gray-400' />
                          </div>
                        </th>
                        <th className='pb-4 pr-8 text-left'>
                          <div className='flex items-center gap-2'>
                            <span className='text-sm font-medium text-gray-500'>
                              Platform
                            </span>
                            <ChevronDown className='h-4 w-4 text-gray-400' />
                          </div>
                        </th>
                        <th className='pb-4 pr-8 text-left'>
                          <div className='flex items-center gap-2'>
                            <span className='text-sm font-medium text-gray-500'>
                              Create date
                            </span>
                            <ChevronDown className='h-4 w-4 text-gray-400' />
                          </div>
                        </th>
                        <th className='pb-4 pr-8 text-left'>
                          <div className='flex items-center gap-2'>
                            <span className='text-sm font-medium text-gray-500'>
                              Leads
                            </span>
                            <ChevronDown className='h-4 w-4 text-gray-400' />
                          </div>
                        </th>
                        <th className='pb-4' />
                      </tr>
                    </thead>
                    <tbody>
                      {campaigns.map((campaign, index) => (
                        <tr
                          key={index}
                          className='border-b border-gray-100 transition-colors hover:bg-gray-50/50'
                        >
                          <td className='py-4 pr-8'>
                            <Checkbox className='rounded-sm border-gray-300' />
                          </td>
                          <td className='py-4 pr-8'>
                            <span className='text-sm font-medium text-gray-900'>
                              {campaign.name}
                            </span>
                          </td>
                          <td className='py-4 pr-8'>
                            <span className='text-sm text-gray-600'>
                              {campaign.platform}
                            </span>
                          </td>
                          <td className='py-4 pr-8'>
                            <span className='text-sm text-gray-500'>
                              {campaign.date}
                            </span>
                          </td>
                          <td className='py-4 pr-8'>
                            <span className='text-sm font-medium text-[#00B8D9]'>
                              {campaign.leads}
                            </span>
                          </td>
                          <td className='py-4'>
                            <div className='flex items-center justify-end gap-2'>
                              <Button
                                variant='ghost'
                                size='icon'
                                className='h-8 w-8 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700'
                              >
                                <Trash2 className='h-4 w-4' />
                              </Button>
                              <Button
                                variant='ghost'
                                size='icon'
                                className='h-8 w-8 rounded-lg text-[#00B8D9] hover:bg-[#00B8D9]/5 hover:text-[#00B8D9]'
                              >
                                <Link2 className='h-4 w-4' />
                              </Button>
                              <Button
                                variant='ghost'
                                size='icon'
                                className='h-8 w-8 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-500'
                              >
                                <Pencil className='h-4 w-4' />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className='overflow-hidden rounded-xl bg-white shadow-sm'>
              <CardContent className='p-6'>
                <h3 className='mb-6 text-lg font-semibold'>Recent Leads</h3>
                <div className='space-y-4'>
                  {recentLeads.map((lead, index) => (
                    <div key={index} className='flex items-center gap-3'>
                      <Avatar className='h-10 w-10'>
                        <AvatarImage
                          src={lead.image}
                          alt={lead.name}
                          className='object-cover'
                        />
                        <AvatarFallback>{lead.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className='font-medium'>{lead.name}</p>
                        <p className='text-sm text-gray-500'>{lead.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant='ghost'
                  className='mt-4 w-full text-sm font-normal text-[#00B8D9] hover:text-[#00B8D9]/90'
                >
                  See All Leads
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
