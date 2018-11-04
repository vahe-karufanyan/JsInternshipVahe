$(document).ready(() => {
  const logInEmail = $('#LogInEmail');
  const LogInPassword = $('#LogInPassword');
  const Name = $('#Name');
  const Price = $('#Price');
  const SignUpEmail = $('#SignUpEmail');
  const SignUpPassword = $('#SignUpPassword');
  const ConfirmPassword = $('#ConfirmPassword');
  const SignUpButton = $('#SignUpButton');
  SignUpButton.on('click', () => {
    const newUser = {
      email: SignUpEmail.val(),
      password: SignUpPassword.val(),
      ConfirmPassword: ConfirmPassword.val(),
    };
    $.ajax({
      type: 'POST',
      url: 'localhost:3000/api/v1/authorisation/signup',
      data: newUser,
      success: function() {
        alert('Successfully signed up.');
        return;
      },
      error: function() {
        alert('Error.');
        return;
      },
    });
  });
});