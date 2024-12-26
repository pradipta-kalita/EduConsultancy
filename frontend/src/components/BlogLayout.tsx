import { ReactNode } from 'react'
import CategoryNav from './CategoryNav'
import Sidebar from './Sidebar'

export default function BlogLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-white pt-32">
            <CategoryNav />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-12">
                    <main className="flex-1 max-w-3xl">{children}</main>
                    <Sidebar className="hidden lg:block w-80" />
                </div>
            </div>
        </div>
    )
}