import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showPasswordArray, setShowPasswordArray] = useState({});

  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("show.png")) {
      ref.current.src = "hide.png";
    } else {
      ref.current.src = "show.png";
    }
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
    }
  };

  const validateForm = () => {
    if (!form.site || !form.username || !form.password) {
      toast.error("Please fill out all required fields!");
      return false;
    }
    return true;
  };

  const savePassword = () => {
    if (!validateForm()) return;

    if (editId) {
      const updatedPasswords = passwordArray.map((item) =>
        item.id === editId ? { ...form, id: editId } : item
      );
      setPasswordArray(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      setEditId(null);
      toast.success("Password updated successfully!");
    } else {
      const newPasswordArray = [...passwordArray, { ...form, id: uuidv4() }];
      setPasswordArray(newPasswordArray);
      localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
      toast.success("Password added successfully!");
    }

    setForm({ site: "", username: "", password: "" });
  };

  const deletePassword = (id) => {
    const updatedPasswords = passwordArray.filter((item) => item.id !== id);
    setPasswordArray(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    toast.success("Password deleted successfully!");
  };

  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find((item) => item.id === id);
    if (passwordToEdit) {
      setForm({
        site: passwordToEdit.site,
        username: passwordToEdit.username,
        password: passwordToEdit.password,
      });
      setEditId(id);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy!");
      });
  };

  const toggleShowPassword = (id) => {
    if (ref.current.src.includes("show.png")) {
      ref.current.src = "hide.png";
    } else {
      ref.current.src = "show.png";
    }
    setShowPasswordArray((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mt-4">
          <span className="text-blue-500">&lt;</span>
          <span className="text-gray-300">Pass</span>
          <span className="text-blue-500">Man/&gt;</span>
        </h1>
        <p className="text-blue-300 text-lg text-center mt-1 mb-8">
          Your own password manager
        </p>
        <div className="flex flex-col p-4 gap-3 items-center">
          <input
            className="rounded-lg border-2 outline-none text-black border-blue-300 w-full  py-2 px-3 placeholder:text-gray-600"
            type="text"
            placeholder="Website name or URL"
            value={form.site}
            onChange={handleChange}
            name="site"
            required
          />
          <div className="flex flex-col md:flex-row w-full gap-3">
            <input
              type="text"
              className="rounded-lg border-2 outline-none text-black border-blue-300 w-full md:w-1/2 placeholder:text-gray-600 py-2 px-3"
              placeholder="Username or email"
              value={form.username}
              onChange={handleChange}
              name="username"
              required
            />
            <div className="relative w-full md:w-1/2">
              <input
                type="password"
                ref={passwordRef}
                className="rounded-lg w-full border-2 outline-none text-black border-blue-300 py-2 px-3 placeholder:text-gray-600"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                name="password"
                required
              />
              <span
                onClick={showPassword}
                className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <img
                  ref={ref}
                  src="show.png"
                  alt="Toggle visibility"
                  className="w-5"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="bg-blue-500 rounded-xl px-6 py-3 text-gray-900 text-xl hover:bg-blue-400 transition-all ease"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            {editId ? "Update" : "Add"}
          </button>
        </div>
        <div className="passwords w-full mt-8">
          <h2 className="text-2xl text-center text-white my-3">
            Your Passwords
          </h2>
          <div className="overflow-x-auto">
            {passwordArray.length === 0 && (
              <div className="text-white text-center text-blue-400">
                No Passwords to Show
              </div>
            )}
            {passwordArray.length !== 0 && (
              <div className="relative overflow-x-auto">
                <table className="table-auto w-full rounded-lg overflow-hidden">
                  <thead className="text-center bg-blue-500 text-white">
                    <tr>
                      <th className="py-2 border-r-2 border-blue-600">
                        Website
                      </th>
                      <th className="py-2 border-r-2 border-blue-600">
                        Username/Email
                      </th>
                      <th className="py-2 border-r-2 border-blue-600">
                        Password
                      </th>
                      <th className="w-20">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-center bg-blue-300">
                    {passwordArray.map((item) => (
                      <tr key={item.id} className="border-2 border-blue-600">
                        <td className="py-2 border-r-2 border-blue-600">
                          <div className="flex flex-col items-center md:flex-row md:items-center gap-2">
                            <a
                              href={item.site}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            >
                              {item.site}
                            </a>
                            <button
                              className="bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600 transition"
                              onClick={() => copyToClipboard(item.site)}
                            >
                              <i className="fa-solid fa-copy"></i>
                            </button>
                          </div>
                        </td>
                        <td className="py-2 border-r-2 border-blue-600">
                          <div className="flex flex-col items-center md:flex-row md:items-center gap-2">
                            {item.username}
                            <button
                              className="bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600 transition"
                              onClick={() => copyToClipboard(item.username)}
                            >
                              <i className="fa-solid fa-copy"></i>
                            </button>
                          </div>
                        </td>
                        <td className="py-2 border-r-2 border-blue-600">
                          <div className="flex flex-col items-center md:flex-row md:items-center gap-2">
                            <input
                              type={
                                showPasswordArray[item.id] ? "text" : "password"
                              }
                              value={item.password}
                              readOnly
                              className="bg-transparent border-none text-center"
                            />
                            <button
                              className="text-white rounded-full p-1"
                              onClick={() => toggleShowPassword(item.id)}
                            >
                              <img
                                ref={ref}
                                className="w-5"
                                src="show.png"
                                alt="Toggle visibility"
                              />
                            </button>
                            <button
                              className="bg-blue-400 text-white rounded-full p-1 hover:bg-blue-600 transition"
                              onClick={() => copyToClipboard(item.password)}
                            >
                              <i className="fa-solid fa-copy"></i>
                            </button>
                          </div>
                        </td>
                        <td className="w-20 flex justify-center">
                          <button
                            className="mr-2 text-blue-400 hover:text-blue-600 transition"
                            onClick={() => editPassword(item.id)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            className="text-red-400 hover:text-red-600 transition"
                            onClick={() => deletePassword(item.id)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
