import React from 'react';
import "./App.scss";
import WeatherApp from './components/weatherApp/weatherApp';

const App: React.FC = (props) => {
    return (
        <div className="App">
            <WeatherApp />
        </div>
    );
}

export default App;
