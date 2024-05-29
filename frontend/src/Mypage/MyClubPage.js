import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
const MyClubPage = ({ myClubList }) => {
    const navigate = useNavigate();

    const handleDropClub = async (id,job) => {
        try {
            await fetch(`http://127.0.0.1:8000/club_introduce/drop_club/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Token ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ job }),
                
            }).then((response) => {
                if (response.ok) {
                    // 삭제된 동아리를 제외한 나의 동아리 목록을 다시 불러옴
                    const updatedClubList = myClubList.filter((club) => club.id !== id);
                    setMyClubList(updatedClubList);
                    return alert('동아리 탈퇴가 완료되었습니다.');
                    // return response.json();
                }
                throw new Error('동아리 회장 권한을 위임해야 탈퇴할 수 있습니다.');
            });
            // Remove the club from the clubData state
        } catch (error) {
            alert(error.message);
        }
    };

    const handleGoToClub = (club_name) => {
        console.log(club_name);
        navigate(`/club_information/club/${club_name}/home`);
    };

    return (
        <div className="container">
            <div className="row">
                {myClubList.map((club) => (
                    <div key={club.member_id} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">동아리명: {club.club_name}</h4>
                                <p className="card-text">직책: {club.job}</p>
                                <button className="btn btn-primary" onClick={() => handleGoToClub(club.club_name)}>바로가기</button>
                                <button className="btn btn-secondary ms-2" onClick={() => handleDropClub(club.member_id, club.job)}>탈퇴하기</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default MyClubPage;
