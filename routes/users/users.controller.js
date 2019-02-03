// import User from '../../models/userRepositery';
// import Error from '../../helpers/error';

// export function _getAll (req, res) {
//     User.find().exec().then(docs => {
//         console.log(docs);
//         res.status(200).json(docs);
//     }).catch(err => {
//         console.log(err);
//         Error(res, 400, 'Bad request');
//     });
// }

// export function _getById (req, res) {
//     const id = req.params.id;
//     User.findOne(id).exec().then(doc => {
//         console.log("From database", doc);
//         if (doc) {
//             res.status(200).json(doc);
//         } else {
//             Error(res, 404, 'No valid entry found for provided ID');
//         }
//     }).catch(err => {
//         console.log(err);
//         Error(res, 400, 'Bad request');
//     });
// }