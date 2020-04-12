import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { getUserEvents } from '../../firebase/utility';
import { Row, Col, Card, Spin } from 'antd';
import DoughnutChart from '../../components/DoughnutChart/DoughnutChart';
import SrijanAppImage from '../../assets/Images/app-min.png';
import GooglePlayBadge from '../../assets/Images/google-play-badge.png';
import scheduleOne from '../../assets/Images/SCH1-min.jpg';
import scheduleTwo from '../../assets/Images/sch-min.jpg';
import scheduleThree from '../../assets/Images/sch3-min.jpg';
import scheduleFour from '../../assets/Images/sch4-min.jpg';
import './Dashboard.css';
const { Meta } = Card;

const Dashboard = props => {
  const { currentUser } = useContext(AuthContext);
  const [userEvents, setUserEvents] = useState(null);

  useEffect(() => {
    getUserEvents(currentUser.uid)
      .then(async userEvents => {
        const events = [];
        for (const eventId in userEvents) {
          events.push(userEvents[eventId]);
        }
        setUserEvents(events);
      })
      .catch(err => console.log(err));
  }, [currentUser.uid])

  return (
    <section className="dashboard">
      <Row>
        <Col md={24} className="flex-container" style={{ padding: '.5rem', textAlign: 'center'}}>
        {userEvents ? (
          <Card headStyle={{backgroundColor: 'rgba(22, 104, 159, 0.3)', borderBottom: '2px solid #00ebff', color: '#00ebff' }}
                bodyStyle={{backgroundColor: 'rgba(22, 104, 159, 0.2)', border: 'none' }}
                style={{ width: '100%',backgroundColor: 'rgba(0,0,0,0)', border: 'none' }}
                title="Your registered events">
            {userEvents.length === 0 ? (
              <div style={{ padding: '2rem 0', color: '#00ebff' }}>
                <strong>You have not registered for any events yet</strong>
              </div>
            ) : (
              <ul className="custom-carousel">
              {userEvents.map((ev, index) => (
                <li className="custom-carousel-item" key={index}>
                  <Card headStyle={{backgroundColor: 'rgba(22, 104, 159, 0.3)', borderBottom: '2px solid #00ebff', color: '#00ebff' }}
                        bodyStyle={{ backgroundColor: 'rgba(22, 104, 159, 0.2)', border: 'none', color:'#00ebff' }}
                        style={{ width: '200px',backgroundColor: 'rgba(0,0,0,0)', border: 'none', color:'#00ebff' }}  
                        size="small"
                        title={ev.event}>
                    <Meta
                        title={<span style={{ color: "#00ebff", textTransform: 'uppercase' }}>Team: {ev.team}</span>}/>
                  </Card>
                </li>
              ))}
              </ul>
            )}
          </Card>
          ) : <Spin />}
        </Col>
      </Row>
      <Row>
        <Col lg={24} className="flex-container" style={{ padding: '.5rem', textAlign: 'center' }}>
          <Card title="Srijan 20 schedule"
                headStyle={{ backgroundColor: 'rgba(22, 104, 159, 0.3)', borderBottom: '2px solid #00ebff', color: '#00ebff' }}
                bodyStyle={{ backgroundColor: 'rgba(22, 104, 159, 0.2)', border: 'none' }}
                style={{ width: '100%', backgroundColor: 'transparent', border: 'none' }}>
            <Row>
              <Col lg={12}>
                <div className="dashboard-img-container">
                  <img alt="Srijan 20 schedule" src={scheduleOne} />
                </div>
              </Col>
              <Col lg={12}>
                <div className="dashboard-img-container">
                  <img alt="Srijan 20 schedule" src={scheduleTwo} />
                </div>
              </Col>
              <Col lg={12}>
                <div className="dashboard-img-container">
                  <img alt="Srijan 20 schedule" src={scheduleThree} />
                </div>
              </Col>
              <Col lg={12}>
                <div className="dashboard-img-container">
                  <img alt="Srijan 20 schedule" src={scheduleFour} />
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row >
        <Col lg={12} className="flex-container" style={{ padding: '.5rem', textAlign: 'center' }}>
          <Card title="Srijan 20 events"
                headStyle={{ backgroundColor: 'rgba(22, 104, 159, 0.3)', borderBottom: '2px solid #00ebff', color: '#00ebff' }}
                bodyStyle={{ backgroundColor: 'rgba(22, 104, 159, 0.2)', border: 'none' }}
                style={{ width: '100%', backgroundColor: 'transparent', border: 'none' }}>
            <DoughnutChart data={[3, 4, 3, 7, 6]} labels={['Coding', 'Gaming', 'Robotics', 'Misc', 'Fun']} />
          </Card>
        </Col>
        <Col lg={12} className="flex-container" style={{ padding: '.5rem', textAlign: 'center' }}>
          <Card title="Download the official Srijan 20 app"
                headStyle={{backgroundColor: 'rgba(22, 104, 159, 0.3)', borderBottom: '2px solid #00ebff', color: '#00ebff' }}
                bodyStyle={{backgroundColor: 'rgba(22, 104, 159, 0.2)', border: 'none' }}
                className="dashboard-app-section">
            <div className="dashboard-app-img-container">
              <img alt="Srijan 20 app" src={SrijanAppImage} />
            </div>
            <a href='https://play.google.com/store/apps/details?id=in.srijanju.androidapp&hl=en_us&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
              <img alt='Get it on Google Play' src={GooglePlayBadge} width="175px"/>
            </a>
          </Card>
        </Col>
      </Row>
    </section>
  );
}

export default Dashboard;