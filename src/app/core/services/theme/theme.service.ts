import { Injectable, signal, effect, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    isDarkMode = signal<boolean>(false);

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            this.isDarkMode.set(savedTheme === 'dark' || (!savedTheme && prefersDark));

            effect(() => {
                const mode = this.isDarkMode() ? 'dark' : 'light';
                localStorage.setItem('theme', mode);

                if (this.isDarkMode()) {
                    document.documentElement.classList.add('dark-theme');
                } else {
                    document.documentElement.classList.remove('dark-theme');
                }
            });
        }
    }

    toggleTheme() {
        this.isDarkMode.update(val => !val);
    }
}
