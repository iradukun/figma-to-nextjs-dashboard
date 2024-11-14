"use client"

import { useState } from 'react'
import { Bell, ChevronDown, Globe, LayoutGrid, Link2, LogOut, Menu, MessageSquare, Pencil, Search, Settings, Trash2, Users, X } from 'lucide-react'
import Image from "next/image"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

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
  { name: "Feb", leads: 32000, campaign: 28000 },
  { name: "Mar", leads: 34000, campaign: 29000 },
  { name: "Apr", leads: 36000, campaign: 31000 },
  { name: "May", leads: 42000, campaign: 35000 },
  { name: "Jun", leads: 45591, campaign: 38000 },
  { name: "Jul", leads: 43000, campaign: 36000 },
  { name: "Aug", leads: 44000, campaign: 37000 },
  { name: "Sep", leads: 45000, campaign: 38000 },
  { name: "Oct", leads: 47000, campaign: 40000 },
  { name: "Nov", leads: 48000, campaign: 41000 },
  { name: "Dec", leads: 49000, campaign: 42000 },
  { name: "Jan", leads: 51000, campaign: 44000 },
]

const campaigns: Campaign[] = [
  { name: "Catalog", platform: "Facebook", date: "Oct, 29, 2023", leads: "12" },
  { name: "Catalog", platform: "Google ad", date: "Oct, 29, 2023", leads: "2" },
  { name: "Catalog", platform: "Radio", date: "Oct, 29, 2023", leads: "20" },
  { name: "Catalog", platform: "TV", date: "Oct, 29, 2023", leads: "30" },
]

const recentLeads: Lead[] = [
  { name: "Jenny Wilson", email: "w.lawson@example.com", image: "/placeholder.svg?height=40&width=40" },
  { name: "Devon Lane", email: "dat.roberts@example.com", image: "/placeholder.svg?height=40&width=40" },
  { name: "Jane Cooper", email: "jgraham@example.com", image: "/placeholder.svg?height=40&width=40" },
  { name: "Dianne Russell", email: "curtis.d@example.com", image: "/placeholder.svg?height=40&width=40" },
]

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-[#1C2434] text-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col justify-between p-6">
          <div>
            <div className="flex items-center justify-between">
              <Image src="/placeholder.svg?height=40&width=150" alt="bouletteproof" width={150} height={40} className="mb-8" />
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-[#2E3A50] lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close sidebar</span>
              </Button>
            </div>
            <nav className="space-y-1">
              <a href="#" className="flex items-center gap-3 rounded-lg bg-[#2E3A50] px-3 py-2 text-sm font-medium">
                <LayoutGrid className="h-5 w-5 text-[#4AC7EC]" />
                <span>Dashboard</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-400 hover:text-white">
                <MessageSquare className="h-5 w-5" />
                <span>Campaigns</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-400 hover:text-white">
                <Users className="h-5 w-5" />
                <span>Leads</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-400 hover:text-white">
                <Globe className="h-5 w-5" />
                <span>Website Analytics</span>
                <ChevronDown className="ml-auto h-4 w-4" />
              </a>
            </nav>
          </div>
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-400 hover:text-white">
              <MessageSquare className="h-5 w-5" />
              <span>Support</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-400 hover:text-white">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-400 hover:text-white">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </a>
          </nav>
        </div>
      </aside>

      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open sidebar</span>
          </Button>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input 
                className="h-9 w-[280px] rounded-full border border-gray-200 bg-gray-50 pl-10 text-sm placeholder:text-gray-500" 
                placeholder="Type to search" 
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-9 gap-1 rounded-full border-gray-200 px-3 text-xs font-medium"
                >
                  EN
                  <ChevronDown className="h-3 w-3 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>French</DropdownMenuItem>
                <DropdownMenuItem>German</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-3">
    <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full bg-[#1C2434]">
      <Bell className="h-5 w-5 text-[#00B8D9]" />
      <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#DE350B] text-[10px] font-medium text-white">4</span>
      <span className="sr-only">4 Notifications</span>
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-9 gap-2 rounded-full bg-[#1C2434] px-2 text-sm font-medium hover:bg-[#E6F4FB]">
          <Avatar className="h-7 w-7">
            <AvatarImage src="/placeholder.svg?height=28&width=28" alt="Lilian Smith" />
            <AvatarFallback>LS</AvatarFallback>
          </Avatar>
          <span className="text-white">Lilian Smith</span>
          <ChevronDown className="h-4 w-4 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
   </div>
        </header>
        <main className="p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-semibold">
              Hey Lilian - <span className="text-gray-400">here's what's happening today</span>
            </h1>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="h-9 rounded-full border-[#00B8D9] px-4 text-sm font-medium text-[#00B8D9] hover:bg-[#00B8D9]/5"
              >
                Add Website
              </Button>
              <Button 
                className="h-9 rounded-full bg-[#00B8D9] px-4 text-sm font-medium text-white hover:bg-[#00B8D9]/90"
              >
                Add Campaign
              </Button>
            </div>
          </div>
          <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden rounded-lg bg-[#1C2434] shadow-sm">
              <CardContent className="p-6">
                <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">Number of leads</h3>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-white">2,048</span>
                  <span className="text-sm font-medium text-red-500">- 0% ↓</span>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden rounded-lg bg-[#1C2434] shadow-sm">
              <CardContent className="p-6">
                <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">Number of campaigns</h3>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-white">123</span>
                  <span className="text-sm font-medium text-[#4AC7EC]">+ 0% ↑</span>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden rounded-lg bg-[#1C2434] shadow-sm">
              <CardContent className="p-6">
                <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">Number of websites</h3>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-white">12</span>
                  <span className="text-sm font-medium text-[#4AC7EC]">+ 0% ↑</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6 grid gap-6 lg:grid-cols-3">
            <Card className="overflow-hidden rounded-lg bg-white shadow-sm lg:col-span-2">
              <CardContent className="p-6">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">Analytics</h3>
                    <div className="mt-1 flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="h-3 w-3 rounded-full bg-[#4AC7EC]" />
                        <span className="text-sm text-gray-500">Leads</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="h-3 w-3 rounded-full bg-[#00B8D9]" />
                        <span className="text-sm text-gray-500">Campaign</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-xs font-medium text-gray-500 hover:text-gray-900">
                      Daily
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs font-medium text-gray-500 hover:text-gray-900">
                      Monthly
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs font-medium text-gray-500 hover:text-gray-900">
                      Yearly
                    </Button>
                  </div>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                      />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="leads" 
                        stroke="#4AC7EC" 
                        strokeWidth={2} 
                        dot={false}
                        activeDot={{ r: 6, fill: "#4AC7EC" }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="campaign" 
                        stroke="#00B8D9" 
                        strokeWidth={2} 
                        dot={false}
                        activeDot={{ r: 6, fill: "#00B8D9" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-lg bg-white shadow-sm">
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold">Recent Leads</h3>
                <div className="space-y-4">
                  {recentLeads.map((lead, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={lead.image} alt={lead.name} />
                        <AvatarFallback>{lead.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{lead.name}</p>
                        <p className="text-xs text-gray-500">{lead.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="ghost" 
                  className="mt-4 w-full justify-start p-0 text-xs font-medium text-[#00B8D9] hover:text-[#00B8D9]/90"
                >
                  See All Leads
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="overflow-hidden rounded-lg bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-lg font-semibold">Recent Campaigns</h3>
                <Button 
                  variant="ghost" 
                  className="p-0 text-xs font-medium text-[#00B8D9] hover:text-[#00B8D9]/90"
                >
                  See All Campaigns
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="pb-3 pr-6">
                        <Checkbox className="rounded border-gray-300" />
                      </th>
                      <th className="pb-3 pr-6 text-left text-xs font-medium uppercase text-gray-500">Name</th>
                      <th className="pb-3 pr-6 text-left text-xs font-medium uppercase text-gray-500">Platform</th>
                      <th className="pb-3 pr-6 text-left text-xs font-medium uppercase text-gray-500">Create date</th>
                      <th className="pb-3 pr-6 text-left text-xs font-medium uppercase text-gray-500">Leads</th>
                      <th className="pb-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((campaign, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-4 pr-6">
                          <Checkbox className="rounded border-gray-300" />
                        </td>
                        <td className="py-4 pr-6 text-sm font-medium">{campaign.name}</td>
                        <td className="py-4 pr-6 text-sm text-gray-500">{campaign.platform}</td>
                        <td className="py-4 pr-6 text-sm text-gray-500">{campaign.date}</td>
                        <td className="py-4 pr-6 text-sm font-medium text-[#00B8D9]">{campaign.leads}</td>
                        <td className="py-4">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-500">
                              <Link2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-500">
                              <Pencil className="h-4 w-4" />
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
        </main>
      </div>
    </div>
  )
}