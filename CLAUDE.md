# Guidelines
0. Create a plan for the project and allow me to validate it. 
1. Implement the project using HTML/CSS classes only. Use react with Typescript if needed.
2. Follow the style guidelines / css specs defined in in the design page in figma file.
3. Create a README.md based in README-template.md and considering skill /create-readme once the project is finished
4. Use the content of the body in @index-source.html as source text
5. Use the @data.json (if exist) as source of data for info displayed.
6. Consider the figma-design file (*.fig) as source or truth for css styles, spacing, fonts, responsive designs. Use tabs Use also the images contained in this file like svgs if not found them in the /assets or /images folder. In .fig file exist pages "Design" and "Design System" where details can be found.
7. The designs inside @design page in figma file reflect the expected output for the several screens: mobile, desktop and tablet. Apply the best responsive design practices for each layout but always keep the specs defined in figma.
8. Initialize local git repo. Create a repo in github. Avoid that figma designs be pushed to github (with .gitignore file).Github repo must be created with a prefix "fsdev-" to identify later the repos created.
9. Split the implementation tasks/parts of the project in separated commits .
10. Update the Author section in README with the following contact info. Add badges to each related link address. Arrange them in inline row.
    https://www.linkedin.com/in/gustavosanchezgalarza/
    https://github.com/gusanchefullstack
    https://hashnode.com/@gusanchedev
    https://x.com/gusanchedev
    https://bsky.app/profile/gusanchedev.bsky.social
    https://www.freecodecamp.org/gusanchedev
    https://www.frontendmentor.io/profile/gusanchefullstack
11. Test implementation at 375px and 1440px screens. 
12. Use semantic HTML (header, nav, main, aside, footer, article, section) consistently — it clarifies structure for users and assistive tech and reduces the need for extra ARIA. One main per page is a simple, high-impact rule to remember. Wrap the primary page content in a single <main> element (and remove any other main roles/elements). If you have multiple sections that look “main-like,” choose one principal area and mark others with appropriate semantics (section, aside, nav).
13. Only one h1 element should exist in html
14. Once finished implementation, take screenshots for 375px strictly and 1440px strictly viewport (responsive view) and add them first to the /screenshots folder in root and them insert from here to the readme in the screenshots section. Shots for 375px should be 40% width of 1440px shots.
15. Avoid to use Multiple links with identical text, which makes it hard to determine each link's purpose when list of links is read out of surrounding context by assistive technology. This causes screen reader users and anyone scanning links quickly to be unsure which plan each action applies to, increasing cognitive load and risking mistaken clicks. Consider using best practices of WCAG.
16. Create a branch in git for the development of each responsive design layout: desktop, tablet, mobile in order to isolate possible issues.


# Architecture
1. Implement the project using HTML/CSS and Reactjs 19 with Typescript if needed.
2. Use vite as deploying server for frontend
3. The source code should be in src/ folder under the project root. CSS styles and Javascript files should inside corresponding subfolders. Use logical components created in a /componentes folder
4. Colors, gradients, typography should be parameterized in the project to allow further changes.
5. Use best practices for frontend development naming convention, semantic html among others.
6. Use best practices for frontend react applications


# Deployment
Once I confirm the project is done and the github repo was created, deploy the project to vercel under my account (gustavosanchezgalarza@gmail.com)

# Update my landing page
Use @landing-page-portfolio-updater to update my portafolio with this project.