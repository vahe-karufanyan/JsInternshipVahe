$(document).ready(() => {
  const Type = $('#Type');
  const Name = $('#Name');
  const Price = $('#Price');
  const Barcode = $('#Barcode');
  const Count = $('#Count');
  const AddItemButton = $('#SignUpButton');
  AddItemButton.on('click', () => {
    const newItem = {
      type: Type.val(),
      name: Name.val(),
      price: Price.val(),
      barcode: Barcode.val(),
      count: Count.val(),
    };
    $.ajax({
      type: 'POST',
      url: 'localhost:3000/api/v1/item',
      data: newItem,
    });
  });
});