import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const MaterialDetails = () => {
  const session = useLoaderData();
  const axiosSecure = useAxiosSecure();
  console.log(session);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session._id) {
      axiosSecure
        .get(`/studentMaterials/${session._id}`)
        .then((res) => {
          console.log("Fetched materials:", res.data);
          setMaterials(res.data); // Update materials
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching materials:", err);
          setLoading(false);
        });
    }
  }, [session._id, axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"></div>
        <span className="ml-2 text-purple">Loading materials...</span>
      </div>
    );
  }

  if (materials.length === 0) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold">No Materials Found</h2>
        <p className="">
          This session have no materials yet.
        </p>
      </div>
    );
  }

  return (
    <div className="py-8 bg-gray-50">
      <h2 className="text-4xl font-bold text-center text-purple mb-6">
        Study Materials
      </h2>
      <p className="text-center text-gray-600 mb-10">
        Access study materials for this session.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl px-4">
  {materials.map((material) => (
    <div
      key={material._id}
      className="bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <div className="p-4">
        <h3 className="text-2xl font-bold text-purple mb-2">{material.title}</h3>
        <p className="text-gray-600 mb-2">Tutor: {material.tutorEmail}</p>

        <div className="mt-4">
          <h4 className="text-lg font-semibold text-gray-700">Images</h4>
          {material.imageUrls.length > 0 ? (
            material.imageUrls.map((url, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                <img
                  src={url}
                  alt={`Material Image ${index + 1}`}
                  className="w-20 h-20 object-cover rounded border"
                />
                <button
                  onClick={() => {
                    fetch(url)
                      .then((response) => {
                        if (!response.ok) {
                          throw new Error("Network response was not ok");
                        }
                        return response.blob();
                      })
                      .then((blob) => {
                        const link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = `material-image-${index + 1}.jpg`; // Set the file name
                        document.body.appendChild(link); // Append the link to the body
                        link.click(); // Trigger the download
                        document.body.removeChild(link); // Remove the link from the document
                        URL.revokeObjectURL(link.href); // Free up memory
                      })
                      .catch((error) => {
                        console.error("Error downloading the image:", error);
                      });
                  }}
                  className="px-4 py-1 bg-purple text-white text-sm rounded hover:bg-opacity-40 transition"
                >
                  Download
                </button>
              </div>
              
            ))
          ) : (
            <p className="text-gray-500">No images available.</p>
          )}
        </div>

        <div className="mt-4">
          <h4 className="text-lg font-semibold text-gray-700">Drive Links</h4>
          {material.driveLinks.length > 0 ? (
            material.driveLinks.map((link, index) => (
              <div key={index} className="mb-2">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Link {index + 1}
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No drive links available.</p>
          )}
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default MaterialDetails;
