import Link from 'next/link'
import { ArrowRight, Sparkles, Zap, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            TaskFlow
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            AI-Powered Intelligent Task Management
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12">
            Tasks that organize themselves and teams that deliver predictably.
            Transform task management from manual coordination to intelligent orchestration.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/dashboard"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border-2 border-primary-600"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-20">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Prioritization</h3>
            <p className="text-gray-600">
              Automatically prioritizes tasks based on deadlines, dependencies, and business value.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Automatic Dependencies</h3>
            <p className="text-gray-600">
              Detects and visualizes task dependencies automatically. Never miss a blocker again.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Predictive Analytics</h3>
            <p className="text-gray-600">
              Forecasts project completion dates and identifies at-risk projects before they become problems.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

