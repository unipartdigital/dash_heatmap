/* eslint no-magic-numbers: 0 */
// RJW: This is used for JS in development MODE ONLY, DO NOT REMOVE
import React, { useEffect, useState } from 'react';
import { DashHeatmap } from '../lib';

/**
 * App component.
 * Used for dev and static demo of Heatmap
 */
const App = () => {
    const [data, setData] = useState();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const svg = '../../assets/svg/test.svg';

    const fetchTestData = async () => {
        try {
            setLoading(true);
            setError("");
        
            const response = await fetch('/assets/data/lmTest.json');
            const responseData = await response.json();

            setData(responseData);
        } catch (e) {
            console.error(e);
            setLoading(false);
            setError(e.message);
        }
    }

    useEffect(() => {
        fetchTestData();
    }, []);

        
    // We can show loading and errors here, eg:
    // if (error) return error message
    // if (loading) return loading spinner

    return (
        <div>
        { data &&
            <DashHeatmap
                id="svg-demo"
                setProps={() => {}}
                width="100%"
                svg={svg}
                data={data}
            />
        }
        </div>
    )
}

export default App;
