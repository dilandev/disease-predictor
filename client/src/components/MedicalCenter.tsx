import { useState, useEffect } from "react";
import logoImage from '../assets/diagnosage-logo.png';

interface LocationData {
    address: string;
    name: string;
    icon: string;
    url: string;
}
  
function MedicalCenter() {
    const initialData: LocationData[] = [];
    const [data, setData] = useState<LocationData[]>(initialData);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude || 6.975553712782505;
                const longitude = position.coords.longitude || 79.91551871164292;

                const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lat: latitude, lng: longitude })  // Send the user's location to the server
                };

                fetch('http://127.0.0.1:5000/medicalcenters', requestOptions)
                .then(res => res.json())
                .then((serverData: LocationData[]) => {
                    setData(serverData);
                    console.log(serverData)  // Update state with data received from the server
                })
                .catch(error => console.error('Error:', error));
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }, []);

    return (
        <>
        {data.length == 0 && <div className="loading">Loading&#8230;</div>

        }
        <div className="container section fade-in-element">
            <div className="row">
                <div className="col-md-12">
                    <ul className="list-group list-group-light">
                        {data.map(l => (
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <img
                                        src={l.icon == "" ? logoImage : l.icon}
                                        alt=""
                                        style={{ width: '200px', height: '200px' }}
                                    />
                                    <div className="ms-3">
                                        <p className="fw-bold mb-1">{l.name}</p>
                                        <p className="text-muted mb-0">{l.address}</p>
                                        <button type="button" onClick={() => window.open(l.url, '_blank')} className="btn btn-success mt-3">
                                            <span>&nbsp;</span>
                                            <span>&nbsp;</span>See Location<span>&nbsp;</span>
                                            <span>&nbsp;</span>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        </>
      );
}

export default MedicalCenter;