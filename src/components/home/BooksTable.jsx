import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { BiShow } from 'react-icons/bi';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BookModal from './BookModal';
import { useState,useEffect } from 'react';
import axios from 'axios';


const BooksTable = ({ books }) => {
  const [showModal, setShowModal] = useState(false);
  const [booksOfUser, setBooksOfUser] = useState(null);
  const searchTerm=localStorage.getItem('email');
  const searchOption='email'
  useEffect(() => {
    axios.get(`http://localhost:5555/books?q=${searchTerm}&option=${searchOption}`)
    .then((response) => {
      setBooksOfUser(response.data.data);
      console.log(response.data.data)
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  
  
  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>No</th>
          <th className='border border-slate-600 rounded-md'>Name</th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Profession
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Location
          </th>
          <th className='border border-slate-600 rounded-md'>Info</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {index + 1}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {book.name}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {book.profession}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {book.location}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
                <button>
                  <BiShow
                    className='text-2xl text-green-600 hover:text-black'
                    onClick={() => setShowModal(true)}
                  />
                </button>
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className='text-2xl text-blue-600 hover:text-black'/>
                </Link>
                {booksOfUser && booksOfUser.some((b) => b.name === book.name) && (
                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
                  </Link>
                )}
                {booksOfUser && booksOfUser.some((b) => b.name === book.name) && (

                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
                </Link>
                )}

              </div>
            </td>
            {showModal && (
              <BookModal book={book} onClose={() => setShowModal(false)} />
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
