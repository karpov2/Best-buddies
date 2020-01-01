function myFunction() {
  /* Get the text field */
  let copyText = document.querySelector(".help__input");
  console.log(copyText);

  /* Select the text field */
  copyText.select();
  console.log(copyText);
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  // alert("Copied the text: " + copyText.value);
}
