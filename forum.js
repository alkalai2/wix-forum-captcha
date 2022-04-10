// The following code snippet prevents a user from accessing the PAP Forum until they complete a reCAPTCHA anti-bot challenge.
// It hides the Forum element and displays a popup with the reCAPTCHA challenge. Then based on the reCAPTCHA results it shows/hides the forum.
// If anyone would like to remove this functionality, simply delete this code snippet.
// With any questions reach out to the author jonathana@papfoundation.org

// Wix element ID's for elements referenced.
const FORUM_ID = "#forum1";
const MODAL_ID = "#statebox8"; 
const CAPTCHA_ID = "#captcha1";
const TIMEOUT_TEXT_ID = "#text18";
const ERROR_TEXT_ID = "#text19";

// Helper function to switch between the captcha popup and the forum
// Arg (bool) is whether the Forum should be shown
function toggleForumCaptchaState(showForum) {
    $w(showForum ? FORUM_ID : MODAL_ID).show();
    $w(!showForum ? FORUM_ID : MODAL_ID).hide();
    if(!showForum) {
        $w(TIMEOUT_TEXT_ID).hide();
        $w(ERROR_TEXT_ID).hide();
    }
}

// All logic is enabled only once the page is ready.
$w.onReady(() => {

    // By default we hide the forum and display the captcha popup.
    toggleForumCaptchaState(false /* showForum */);

    $w(CAPTCHA_ID).onVerified(() => {
        toggleForumCaptchaState(true /* showForum */);
    });

    $w(CAPTCHA_ID).onTimeout(() => {
        $w(TIMEOUT_TEXT_ID).show();
        $w(CAPTCHA_ID).reset();
    });

    $w(CAPTCHA_ID).onError(() => {
        $w(ERROR_TEXT_ID).show();
        $w(CAPTCHA_ID).reset();
    });
});
