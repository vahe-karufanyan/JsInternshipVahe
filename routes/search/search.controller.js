import Item from '../../models/itemRepositery';
import Error from '../../helpers/error';

function search(req, res) {
  const name = req.params.name;
  if (!name) {
    return Error(res, 404, 'Please enter the name.');
  } 
  Item.findOne({ name }).exec().then(doc => {
    if (!doc) {
      return Error(res, 404, 'No Item found!');
    }
    res.status(200).json(doc);
  }).catch(err => {
    Error(res, 400, err);
  });
}

export default search;