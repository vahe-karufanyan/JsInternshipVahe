$(document).ready(() => {
  const logInEmail = $('#LogInEmail');
  const LogInPassword = $('#LogInPassword');
  const LogInButton = $('#LogInButton');
  LogInButton.on('click', () => {
    const existingUser = {
      email: logInEmail.val(),
      password: LogInPassword.val(),
    };
    $.ajax({
      type: 'POST',
      url: 'localhost:3000/api/v1/authorisation/logIn',
      data: existingUser,
      success: function() {
        alert('Successfully logged in.');
        return;
      },
      error: function() {
        alert('Error.');
        return;
    },
    });
  });
});