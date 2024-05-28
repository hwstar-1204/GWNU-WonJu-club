import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import './club_management.css';
import defaultImage from "../profile.jpg";

const ClubManagementPage = () => {
  const {clubName} = useParams();
  const [clubNameInput, setClubNameInput] = useState('');
  const [clubData, setClubData] = useState(null);
  const [clubList, setClubList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newLogo, setNewLogo] = useState('');
  const [newPhoto, setNewPhoto] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [newIntroduction, setNewIntroduction] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showClubSelection, setShowClubSelection] = useState(true);
  const [isEditingIntroduction, setIsEditingIntroduction] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageType, setImageType] = useState('');
  const [btnMode, setBtnMode] = useState('');

  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!clubName) {
      return;
    }

    const fetchClubData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/club_management/club/${clubName}/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (response.data) {
          setClubData(response.data);
          setIsLoading(false);
          setShowClubSelection(false);
        } else {
          setIsLoading(false);
          setErrorMessage('동아리 데이터가 존재하지 않습니다.');
        }
      } catch (error) {
        console.error('Error fetching club data:', error);
        setIsLoading(false);
        setErrorMessage('동아리 데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.');
      }
    };

    fetchClubData();
  }, [clubName]);

  const fetchImageData = async (type, mode, btn) => {
    if (!clubName) {
      console.error('Club name is missing.');
      return;
    }

    setBtnMode(btn);

    try {
      const response = await axios.get(`http://localhost:8000/club_management/club/${clubName}/image/`, {
        params: {
          image: type
        },
        headers: {
          'Authorization': `Token ${token}`
        }
      });

      const imageData = response.data.images;

      if (mode === 'select') {
        setImageType(type);
        setImageList(imageData.map(image => ({ url: `data:image/jpeg;base64,${image.data}`, name: image.file_name })));
        setIsImageModalOpen(true);
      } else {
        // Handle other modes if needed
      }
    } catch (error) {
      console.error('Error fetching image data:', error);
    }
  };


  const handleImageSelect = async (image) => {
    try {
      if (imageType === 'logo' && btnMode === 'update') {
        handleLogoUpdate(image.name);
      } else if (imageType === 'logo' && btnMode === 'delete') {
        handleLogoDelete(image.name); // 여전히 URL로 처리
      } else if (imageType === 'photo' && btnMode === 'update') {
        handlePhotoUpdate(image.name);
      } else if (imageType === 'photo' && btnMode === 'delete') {
        handlePhotoDelete(image.name); // 여전히 URL로 처리
      }
      setIsImageModalOpen(false);
    } catch (error) {
      console.error('Error handling image select:', error);
    }
  };

  const handleLogoAdd = async () => {
    if (!clubName || !newLogo) {
      return;
    }
  
    const formData = new FormData();
    formData.append('image', newLogo);
  
    try {
      const response = await axios.post(`http://localhost:8000/club_management/club/${clubName}/image/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${token}`
        }
      });
  
      setNewLogo(''); // 추가 후 상태 초기화
    } catch (error) {
      console.error('Error adding logo:', error);
    }
  };

  const handleLogoUpdate = async (image) => {
    if (!clubName) {
      return;
    }

    const blob = new Blob([image], { type: 'image/png' });

    const formData = new FormData();
    formData.append('image', blob, image);

    try {
      const response = await axios.patch(`http://localhost:8000/club_management/club/${clubName}/image/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${token}`
        }
      });

      if (response.data && response.data.logo) {
        // 이미지 데이터를 Base64로 인코딩하여 이미지로 표시
        const logoDataURL = `data:image/png;base64,${response.data.logo}`;
        // Update club data with the new logo path
        setClubData((prev) => ({
          ...prev,
          club_info: {
            ...prev.club_info,
            logo: logoDataURL
          }
        }));
      } else {
        console.error('Invalid response from server:', response);
      }

      setNewLogo(''); // 수정 후 상태 초기화
    } catch (error) {
      console.error('Error updating logo:', error);
    }
  };

  const handleLogoDelete = async (image) => {
    if (!clubName) {
      return;
    }

    // const blob = new Blob([image], { type: 'image/png' });

    // const formData = new FormData();
    // formData.append('image', blob, image);

    try {
      const response = await axios.delete(`http://localhost:8000/club_management/club/${clubName}/image/`, {
        data: { image: image },
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${token}`
        }
      });

      if (response.data && response.data.logo) {
        // 이미지 데이터를 Base64로 인코딩하여 이미지로 표시
        const logoDataURL = `data:image/png;base64,${response.data.logo}`;
        // Update club data with the new logo path
        setClubData((prev) => ({
          ...prev,
          club_info: {
            ...prev.club_info,
            logo: logoDataURL
          }
        }));
      } else {
        console.error('Invalid response from server:', response);
      }

      setNewLogo(''); // 수정 후 상태 초기화
    } catch (error) {
      console.error('Error deleting logo:', error);
    }
  };

  const handlePhotoAdd = async () => {
    if (!clubName || !newPhoto) {
      return;
    }
  
    const formData = new FormData();
    formData.append('image', newPhoto);
  
    try {
      const response = await axios.post(`http://localhost:8000/club_management/club/${clubName}/image/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${token}`
        }
      });
  
      setNewPhoto(''); // 추가 후 상태 초기화
    } catch (error) {
      console.error('Error adding photo:', error);
    }
  };

  const handlePhotoUpdate = async (image) => {
    if (!clubName) {
      return;
    }

    const blob = new Blob([image], { type: 'image/png' });

    const formData = new FormData();
    formData.append('image', blob, image);

    try {
      const response = await axios.patch(`http://localhost:8000/club_management/club/${clubName}/image/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${token}`
        }
      });

      if (response.data && response.data.photo) {
        // 이미지 데이터를 Base64로 인코딩하여 이미지로 표시
        const photoDataURL = `data:image/png;base64,${response.data.photo}`;
        // Update club data with the new logo path
        setClubData((prev) => ({
          ...prev,
          club_info: {
            ...prev.club_info,
            photo: photoDataURL
          }
        }));
      } else {
        console.error('Invalid response from server:', response);
      }

      setNewPhoto(''); // 수정 후 상태 초기화
    } catch (error) {
      console.error('Error updating photo:', error);
    }
  };

  const handlePhotoDelete = async (image) => {
    if (!clubName) {
      return;
    }

    // const blob = new Blob([image], { type: 'image/png' });

    // const formData = new FormData();
    // formData.append('image', blob, image);

    try {
      const response = await axios.delete(`http://localhost:8000/club_management/club/${clubName}/image/`, {
        data: { image: image },
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${token}`
        }
      });

      if (response.data && response.data.photo) {
        // 이미지 데이터를 Base64로 인코딩하여 이미지로 표시
        const photoDataURL = `data:image/png;base64,${response.data.photo}`;
        // Update club data with the new logo path
        setClubData((prev) => ({
          ...prev,
          club_info: {
            ...prev.club_info,
            photo: photoDataURL
          }
        }));
      } else {
        console.error('Invalid response from server:', response);
      }

      setNewPhoto(''); // 수정 후 상태 초기화
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const handleLogoFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewLogo(file);
    }
  };

  const handlePhotoFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPhoto(file);
    }
  };

  // 로고 추가 버튼 클릭 이벤트 핸들러
  const handleLogoAddClick = () => {
    handleLogoAdd();
  };

  // 사진 추가 버튼 클릭 이벤트 핸들러
  const handlePhotoAddClick = () => {
    handlePhotoAdd();
  };

  const handleLogoDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file, setNewLogo);
    }
  };

  const handlePhotoDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file, setNewPhoto);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileUpload = (file, setter) => {
    const reader = new FileReader();
    reader.onload = () => {
      const fileDataUrl = reader.result;
      setter(fileDataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleIntroductionUpdate = async () => {
    if (newIntroduction) {
      try {
        const response = await axios.patch(`http://localhost:8000/club_management/club/${clubName}/introducation/`,  
          {introduction: newIntroduction},
          {headers: {
            'Authorization': `Token ${token}`
          }}
        );
        if (response.data && response.data.introduction) {
          setClubData((prev) => ({
            ...prev,
            club_info: {
              ...prev.club_info,
              introducation: response.data.introduction
            }
          }));
        } else {
          console.error('Invalid response from server:', response);
        }
        setIsEditingIntroduction(false);
      } catch (error) {
        console.error('Error updating introduction:', error);
      }
    }
  };

  const approveMember = async (id) => {
    try {
      await axios.patch(`http://localhost:8000/club_management/club/${clubName}/member/${id}/`, null, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      setClubData(prev => ({
        ...prev,
        applying_members: prev.applying_members.filter(member => member.id !== id),
        existing_members: [...prev.existing_members, prev.applying_members.find(member => member.id === id)]
      }));
    } catch (error) {
      console.error('Error approving member:', error);
    }
  };

  const rejectMember = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/club_management/club/${clubName}/member/${id}/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      setClubData(prev => ({
        ...prev,
        applying_members: prev.applying_members.filter(member => member.id !== id)
      }));
    } catch (error) {
      console.error('Error rejecting member:', error);
    }
  };

  const handleRoleChange = async (memberId, newRole) => {
    if (!clubName) {
      return;
    }
  
    try {
      await axios.patch(
        `http://localhost:8000/club_management/club/${clubName}/member/${memberId}/manage/`,
        { role: newRole },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          }
        }
      );
  
      setClubData(prev => ({
        ...prev,
        existing_members: prev.existing_members.map(member => {
          if (member.id === memberId) {
              member.job = newRole;
            }
            return member;
          })
        }));
    } catch (error) {
      console.error('구성원 역할 변경 중 오류 발생:', error);
    }
  };
  
  const handleRemoveMember = async (memberId) => {
    if (!clubName) {
      return;
    }
  
    try {
      await axios.delete(
        `http://localhost:8000/club_management/club/${clubName}/member/${memberId}/manage/`,
        {
          headers: {
            'Authorization': `Token ${token}`
          }
        }
      );
  
      setClubData((prev) => ({
        ...prev,
        existing_members: prev.existing_members.filter((member) => member.id !== memberId)
      }));
    } catch (error) {
      console.error('구성원 제거 중 오류 발생:', error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="ClubManagementPage">
      <div className="content-wrapper">
        <section id="clubManagementPage" className="section">
          {clubData ? (
            <div className="club-info">
              <h2>{clubName}/동아리 관리</h2>
              <div className="logo-container">
                <img src={clubData.club_info.logo} alt="Club Logo" />
              </div>
              <div className="member-container">
                <h3>회원 목록</h3>
                {clubData.existing_members && clubData.existing_members.length > 0 ? (
                  <ul className="member-list">
                    {clubData.existing_members.map(member => (
                      <li key={member.id} className="member-item">
                        <img src={defaultImage} alt="프로필 사진" className="profile-image"/>
                        <span>{member.user}</span>
                        <span>{member.job}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>회원 정보가 없습니다.</p>
                )}
              </div>

              {/* 회원 관리 섹션 */}
            <div className="member-management-section">
              <h3>회원 관리</h3>
              {clubData.existing_members && clubData.existing_members.length > 0 ? (
                <div className="member-management-list">
                  {clubData.existing_members.map((member) => (
                    <div key={member.id} className="member-management-item">
                      <img
                        src={member.profile_photo ? `data:image/jpeg;base64,${member.profile_photo}` : defaultImage}
                        alt={member.user}
                        className="member-photo"
                      />
                      <span className="member-name">{member.user}</span>
                      <select
                        value={member.role}
                        onChange={(e) => handleRoleChange(member.id, e.target.value)}
                        className="member-role-select"
                      >
                        <option value="original">{member.job}</option> 
                        <option value="회장">회장</option>
                        <option value="부회장">부회장</option>
                        <option value="일반회원">일반회원</option>
                      </select>
                      <button
                        className="remove-member-btn"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        퇴출
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>관리할 회원이 없습니다.</p>
              )}
            </div>

              <h3>신규 회원 대기</h3>
              <div className="applying-members">
                {clubData.applying_members && clubData.applying_members.length > 0 ? (
                  <div className="applying-members-container">
                    {clubData.applying_members.map(member => (
                      <div key={member.id} className="applying-member">
                        {/* <p></p>  받아온 데이터 존재하는 학생 이름 넣기 */}
                        <p>{member.job}</p>
                        <div className="action-buttons">
                          <button onClick={() => approveMember(member.id)}>승인</button>
                          <button onClick={() => rejectMember(member.id)}>거부</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>신규 회원 대기 목록이 비어 있습니다.</p>
                )}
              </div>
              <h3>동아리 로고/배경 변경</h3>
              <div className="logo-photo-container" style={{ display: 'flex' }}>
                <div className="logo-update" style={{ flex: 1 }}>
                  <div className="logo-drop-area" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={clubData.club_info.logo} alt="Club Logo" style={{ marginBottom: '10px' }} />
                    <div>
                      <input
                        type="file"
                        id="logo-file-input"
                        style={{ display: 'none' }}
                        onChange={handleLogoFileSelect}
                      />
                      <button onClick={() => fetchImageData('logo', 'select', 'update')}>수정</button>
                      <button onClick={() => fetchImageData('logo', 'select', 'delete')}>삭제</button>
                      <button onClick={() => document.getElementById('logo-file-input').click()}>파일 선택</button>
                      <button onClick={handleLogoAddClick}>추가</button> {/* 추가 버튼 */}
                    </div>
                  </div>
                </div>
                <div className="photo-update" style={{ flex: 1 }}>
                  <div className="photo-drop-area" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={clubData.club_info.photo} alt="Club Photo" style={{ marginBottom: '10px' }} />
                    <div>
                      <input
                        type="file"
                        id="photo-file-input"
                        style={{ display: 'none' }}
                        onChange={handlePhotoFileSelect}
                      />
                      <button onClick={() => fetchImageData('photo', 'select', 'update')}>수정</button>
                      <button onClick={() => fetchImageData('photo', 'select', 'delete')}>삭제</button>
                      <button onClick={() => document.getElementById('photo-file-input').click()}>파일 선택</button>
                      <button onClick={handlePhotoAddClick}>추가</button> {/* 추가 버튼 */}
                    </div>
                  </div>
                </div>
              </div>

              <h3>동아리 소개글</h3>
              <div className="introduction-container">
                {isEditingIntroduction ? (
                  <>
                    <textarea
                      placeholder="New Introduction"
                      value={newIntroduction}
                      onChange={(e) => setNewIntroduction(e.target.value)}
                    ></textarea>
                    <button onClick={handleIntroductionUpdate}>저장</button>
                    <button onClick={() => setIsEditingIntroduction(false)}>취소</button>
                  </>
                ) : (
                  <>
                    <p>{clubData.club_info.introducation}</p>
                    <button onClick={() => setIsEditingIntroduction(true)}>수정</button>
                  </>
                )}
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
          ) : (
              <p>Loading...</p>
          )}
        </section>
      </div>

      {/* Image Selection Modal */}
      <Modal
        isOpen={isImageModalOpen}
        onRequestClose={() => setIsImageModalOpen(false)}
        contentLabel="Image Selection"
        className="image-selection-modal"
      >
        <h2>이미지를 선택해주세요</h2>
        <div className="image-list">
          {imageList.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`Image ${image.name}`}
              onClick={() => handleImageSelect(image)}
              className="image-item"
            />
          ))}
        </div>
        <button onClick={() => setIsImageModalOpen(false)}>취소</button>
      </Modal>
    </div>
  );
};

export default ClubManagementPage;
