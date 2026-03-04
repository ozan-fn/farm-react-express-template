import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard: React.FC = () => {
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
                <p className="text-gray-600">Welcome to your dashboard! Manage your application here.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                        <CardDescription>General statistics and information</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700">This is where you can manage your application.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Analytics</CardTitle>
                        <CardDescription>View your app's performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700">Analytics data will be displayed here.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Settings</CardTitle>
                        <CardDescription>Configure your preferences</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700">Access settings and preferences.</p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex gap-4">
                <Button>View Reports</Button>
                <Button variant="outline">Export Data</Button>
                <Button variant="secondary">Settings</Button>
            </div>
        </div>
    );
};

export default Dashboard;
