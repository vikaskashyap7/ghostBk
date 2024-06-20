document.addEventListener('DOMContentLoaded', function() {
    const langDropdownButton = document.getElementById('lang_dropdown');
    const navLinks = document.querySelectorAll('a.nav-link');
    // console.log(langDropdownButton)

    function updateNavLinks(language) {
        // console.log(language,"dfj")
        navLinks.forEach(link => {
            // console.log(link,"kflmgk")
            if (language === 'हिंदी') {
                if (!link.href.includes('/hi/')) {
                    link.href = link.href.replace('/tag/colours-of-india/', '/tags/');
                   
                }
               
            } else {
                link.href = link.href.replace('/tag/colours-of-india/', '/tag/english/');
                
            }
        });
    }

    function setLanguage(language) {
        if (language === 'हिंदी') {
            langDropdownButton.innerText = 'हिंदी';
            updateNavLinks(language);
        } else {
            langDropdownButton.innerText = 'English';
            updateNavLinks(language);
        }
    }

    // Initial language setting based on the current page URL
    if (window.location.href.includes('/hi/')||window.location.href.includes('/tags/')) {
        setLanguage('हिंदी');
    }
     else {
        setLanguage('English');
    }

    langDropdownButton.addEventListener('click', function() {
        const currentLang = langDropdownButton.innerText.trim();
        // const newLang = currentLang === 'English' ? 'हिंदी' : 'English';
        setLanguage(currentLang);
    });
});
