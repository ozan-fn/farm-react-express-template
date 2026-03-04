import { useState } from "react";
import reactLogo from "../assets/react.svg";
import FarmLogo from "../assets/logo.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
    const [count, setCount] = useState(0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
            <div className="container mx-auto px-4 py-16">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4">Farm + React</h1>
                    <p className="text-xl text-slate-300 dark:text-slate-300">Modern web development with cutting-edge tools</p>
                </div>

                {/* Logo Section */}
                <div className="flex justify-center items-center gap-8 mb-16">
                    <a href="https://farmfe.org/" target="_blank" rel="noopener noreferrer" className="group">
                        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
                            <img src={FarmLogo} className="h-20 w-20 object-contain group-hover:animate-pulse" alt="Farm logo" />
                        </div>
                    </a>

                    <div className="text-4xl text-slate-400">+</div>

                    <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="group">
                        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
                            <img src={reactLogo} className="h-20 w-20 object-contain group-hover:animate-spin" alt="React logo" />
                        </div>
                    </a>
                </div>

                {/* Interactive Card */}
                <div className="max-w-md mx-auto">
                    <Card className="bg-white/10 backdrop-blur-md border border-white/20">
                        <CardHeader className="text-center">
                            <CardTitle className="text-white">Interactive Counter</CardTitle>
                            <CardDescription className="text-slate-300">Click the button to increment</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="mb-6">
                                <Button onClick={() => setCount((count) => count + 1)} className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95">
                                    Count: {count}
                                </Button>
                            </div>

                            <p className="text-slate-300 text-sm mb-2">
                                Edit <code className="bg-slate-800/50 px-2 py-1 rounded text-xs font-mono">src/main.tsx</code> and save to test HMR
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Footer */}
                <div className="text-center mt-16">
                    <p className="text-slate-400 text-sm">
                        Click on the logos above to learn more about <span className="text-purple-400 font-semibold">Farm</span> and <span className="text-cyan-400 font-semibold">React</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
