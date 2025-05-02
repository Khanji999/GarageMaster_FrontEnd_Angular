// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
        darkMode: 'class',
        theme: {
            extend: {
                animation: {
                    'bounce-slow': 'bounce 3s infinite',
                    'pulse-slow': 'pulse 4s infinite',
                },
                colors: {
                    primary: {
                        light: '#3b82f6',
                        dark: '#2563eb',
                    },
                    secondary: {
                        light: '#f59e0b',
                        dark: '#d97706',
                    }
                }
            }
        }
    }

export default config;
