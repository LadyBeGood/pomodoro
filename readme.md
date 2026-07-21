




## Non Issues
These are some issues related to tooling that do not affect the build.

- 
    In VS Code (atleast), CSS files that use TailwindCSS specific *at rules* may give a warning such as: `Unknown at rule @theme in style.css`.
    
    If you want to remove those yellow squiggly lines:
    1. Make sure you've installed `Tailwind CSS IntelliSense` extension
    2. Go to the specific css file giving error.
    3. Press `Ctrl-Shift-P` to open **Command Palette**
    4. Search and Select **Change Language Mode**
    5. Search and Select **Tailwind CSS**

- Sometimes `tsconfig.json` file shows several errors related to config options. I have not found any solution on how to remove them. [Link to official issue](https://github.com/vitejs/vite/issues/18139).

## License
Copyright © 2026 LadyBeGood. All rights reserved.