/**
 * Adds "Copy Code" buttons to <pre> elements in the content area.
 */
document.addEventListener('DOMContentLoaded', () => {
    const preBlocks = document.querySelectorAll('.content-body pre'); // Target pre blocks within post/page content

    preBlocks.forEach(pre => {
        const code = pre.querySelector('code');
        if (!code) return; // Skip if no code tag inside

        // Check if button already exists (e.g., during partial page updates - less likely here)
        if (pre.querySelector('.copy-code-button')) {
            return;
        }

        const button = document.createElement('button');
        button.className = 'copy-code-button btn btn-sm'; // Add Bootstrap btn classes if desired
        button.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
        button.setAttribute('aria-label', 'Copy code to clipboard');

        pre.style.position = 'relative'; // Ensure pre is positioned for absolute button
        pre.appendChild(button);

        button.addEventListener('click', () => {
            const codeToCopy = code.innerText || code.textContent; // Get text content

            navigator.clipboard.writeText(codeToCopy).then(() => {
                // Success feedback
                button.innerHTML = '<i class="bi bi-check-lg"></i> Copied!';
                button.classList.add('btn-success'); // Optional: change color

                setTimeout(() => {
                    button.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
                    button.classList.remove('btn-success');
                }, 2000); // Reset after 2 seconds

            }).catch(err => {
                console.error('Failed to copy code: ', err);
                button.innerHTML = '<i class="bi bi-x-lg"></i> Error';
                button.classList.add('btn-danger');

                setTimeout(() => {
                    button.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
                     button.classList.remove('btn-danger');
                }, 3000);
            });
        });
    });
});