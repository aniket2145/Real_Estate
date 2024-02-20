// import { useEffect, useState } from "react";

// export default function Contact({ listing }) {
//   const [owner, setOwner] = useState(null);

//   useEffect(() => {
//     const fetchOwner = async () => {
//       try {
//         const res = await fetch(`/api/user/${listing.userRef}`);
//         const data = await res.json();
//         setOwner(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchOwner();
//   }, [listing.userRef]);

//   return (
//     <div>
//       {owner && (
//         <div className="">
//           <p>
//             Contact <span>{owner.username}</span>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [owner, setOwner] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        // Check if listing and listing.userRef are defined before making the fetch request
        if (listing && listing.userRef) {
          const res = await fetch(`/api/user/${listing.userRef}`);

          if (!res.ok) {
            throw new Error(`Failed to fetch user. Status: ${res.status}`);
          }

          const data = await res.json();

          // Ensure that the data returned has the expected structure
          if (data && data.username) {
            setOwner(data);
          } else {
            throw new Error("Unexpected data structure from the server");
          }
        }
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };

    fetchOwner();
  }, [listing]); // Include listing in the dependency array to handle changes in the listing prop

  return (
    <div>
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      {owner && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{owner.username}</span> for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows={2}
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <Link
            to={`mailto:${owner.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </div>
  );
}
