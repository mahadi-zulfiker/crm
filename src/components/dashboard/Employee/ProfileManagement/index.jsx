import React, { useState } from "react";
import { faker } from "@faker-js/faker";

function ProfileManagement() {
  const [user, setUser] = useState({
    avatar: faker.image.avatar(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    bio: faker.lorem.paragraph(),
    jobTitle: faker.person.jobTitle(),
    department: faker.commerce.department(),
    skills: ["JavaScript", "React", "Node.js"],
    interests: ["Coding", "Music", "Traveling"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/yourprofile",
      github: "https://github.com/yourprofile",
      twitter: "https://twitter.com/yourprofile"
    }
  });

  const [editing, setEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setUser({ ...user, skills: [...user.skills, newSkill] });
      setNewSkill("");
    }
  };

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      setUser({ ...user, interests: [...user.interests, newInterest] });
      setNewInterest("");
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen flex items-center justify-center p-6">
      <div className="p-6 rounded-lg shadow-lg w-full max-w-md bg-white">
        <div className="flex flex-col items-center">
          <label htmlFor="avatarUpload" className="cursor-pointer">
            <img src={user.avatar} alt="User Avatar" className="w-32 h-32 rounded-full mb-4 border-4 border-gray-300" />
          </label>
          <input id="avatarUpload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          {editing ? (
            <input type="text" name="name" value={user.name} onChange={handleChange} className="text-xl font-semibold mb-2 text-center border p-1 rounded" />
          ) : (
            <h2 className="text-2xl font-semibold mb-2">{user.name}</h2>
          )}
          {editing ? (
            <input type="text" name="jobTitle" value={user.jobTitle} onChange={handleChange} className="text-gray-600 text-center border p-1 rounded" />
          ) : (
            <p className="text-gray-600 mb-4">{user.jobTitle} - {user.department}</p>
          )}
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Address:</strong> {user.address}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">About Me</h3>
          {editing ? (
            <textarea name="bio" value={user.bio} onChange={handleChange} className="border p-1 w-full rounded" />
          ) : (
            <p>{user.bio}</p>
          )}
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Skills</h3>
          <ul className="list-disc list-inside">
            {user.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          {editing && (
            <div className="mt-2 flex gap-2">
              <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} className="border p-1 rounded w-full" />
              <button onClick={handleAddSkill} className="px-3 py-1 bg-green-500 text-white rounded">Add</button>
            </div>
          )}
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Interests</h3>
          <ul className="list-disc list-inside">
            {user.interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
          {editing && (
            <div className="mt-2 flex gap-2">
              <input type="text" value={newInterest} onChange={(e) => setNewInterest(e.target.value)} className="border p-1 rounded w-full" />
              <button onClick={handleAddInterest} className="px-3 py-1 bg-green-500 text-white rounded">Add</button>
            </div>
          )}
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Social Media</h3>
          <p><strong>LinkedIn:</strong> <a href={user.socialLinks.linkedin} className="text-blue-500">{user.socialLinks.linkedin}</a></p>
          <p><strong>GitHub:</strong> <a href={user.socialLinks.github} className="text-blue-500">{user.socialLinks.github}</a></p>
          <p><strong>Twitter:</strong> <a href={user.socialLinks.twitter} className="text-blue-500">{user.socialLinks.twitter}</a></p>
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className="mt-4 w-full px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          {editing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
}

export default ProfileManagement;