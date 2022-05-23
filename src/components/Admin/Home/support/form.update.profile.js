import { useState } from "react";
import noImage from "../../../../assets/img/no-image.png";
const AdminFormUpdateProfile = ({
  profileData,
  profileImage,
  setUserData,
  setProfileImage,
  userData,
  isLoading,
  onSubmit,
  setSelectedImage,
}) => {
  const [show, setShow] = useState(false)
  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" name="id" value={profileData.id || ""} />
      <div className="mb-3">
        {!profileImage && (
          <img
            src={profileData.image ? profileData.image : noImage}
            alt="Profile"
            className="rounded mx-auto d-block"
            width={100}
          />
        )}
        {profileImage && (
          <img
            src={profileImage}
            alt="Profile"
            className="rounded mx-auto d-block"
            width={100}
          />
        )}
        <input
          type="file"
          accept="image/*"
          className="form-control"
          style={{ width: "100px", margin: "auto", marginTop: "10px" }}
          onChange={(e) => {
            setProfileImage(URL.createObjectURL(e.target.files[0]));
            setUserData({ ...userData, image: e.target.files[0] });
            setSelectedImage(e.target.files[0]);
          }}
        />
      </div>

      <div className="mb-3 mx-3">
        <label style={{ fontSize: "17px" }}>Your Details</label>
        <div className="row">
          <div className="col-4">
            <input
              type="text"
              className="form-control"
              placeholder="Your name"
              name="name"
              value={userData.name ? userData.name : profileData.name || ""}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </div>
          <div className="col-4">
            <input
              type="email"
              className="form-control"
              placeholder="Your Email"
              name="name"
              value={userData.email ? userData.email : profileData.email || ""}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>
          <div className="col-4">
            <input
              type="number"
              className="form-control"
              placeholder="Phone"
              name="phone"
              value={profileData.phone || ""}
              disabled
            />
          </div>
        </div>
      </div>

      <div className="mb-3 mx-3 my-4">
        <label style={{ fontSize: "17px" }}>Change Password</label>
        <div className="row">
          <div className="col-4">
            <input
              type={show ?"text":"password"}
              className="form-control"
              placeholder="Your Current Password"
              name="password"
              autoComplete="off"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </div>
          <div className="col-4">
            <input
              type={show ? "text" : "password"}
              className="form-control"
              placeholder="New Password"
              name="newPassword"
              onChange={(e) =>
                setUserData({ ...userData, newPassword: e.target.value })
              }
            />
          </div>
          <div className="col-4">
            <input
              type={show ? "text" : "password"}
              className="form-control"
              placeholder="New Password Again"
              name="repeatPassword"
              onChange={(e) =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            />
            <input type="checkbox" onChange={()=>setShow(prevState=>!prevState)}/>Show All
          </div>
        </div>
      </div>

      <div className="text-center my-4">
        <button
          type="submit"
          className="btn bg-gradient-info w-30 mt-4 mb-0"
          disabled={isLoading}
        >
          {isLoading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          &nbsp;&nbsp;Update Profile
        </button>
      </div>
    </form>
  );
};

export default AdminFormUpdateProfile;
