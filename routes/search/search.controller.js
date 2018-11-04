import Item from '../../models/itemRepositery';
import Error from '../../helpers/error';
import {
  validateForSearch,
} from '../../helpers/joiValidation';

function search(req, res) {
  const name = req.params.name;
  const object = {
    name,
  };
  validateForSearch(object)
    .then(() => Item.find({ name }))
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      Error(res, 400, err);
    });
}

export default search;