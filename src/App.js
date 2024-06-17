import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', height: '', mass: '', hair_color: '', skin_color: '' });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://192.168.137.1:3000');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const addItem = async () => {
        try {
            await axios.post('http://192.168.137.1:3000', newItem);
            fetchItems();
            setNewItem({ name: '', height: '', mass: '', hair_color: '', skin_color: '' });
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://192.168.137.1:3000/${id}`);
            fetchItems();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const searchItems = async () => {
        try {
            const response = await axios.get(`http://192.168.137.1:3000/search?query=${searchQuery}`);
            setItems(response.data);
        } catch (error) {
            console.error('Error searching items:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">API STAR-WARS</h1>

            <div className="row mb-3">
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Add new item name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                </div>
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Height"
                        value={newItem.height}
                        onChange={(e) => setNewItem({ ...newItem, height: e.target.value })}
                    />
                </div>
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Mass"
                        value={newItem.mass}
                        onChange={(e) => setNewItem({ ...newItem, mass: e.target.value })}
                    />
                </div>
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Hair Color"
                        value={newItem.hair_color}
                        onChange={(e) => setNewItem({ ...newItem, hair_color: e.target.value })}
                    />
                </div>
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Skin Color"
                        value={newItem.skin_color}
                        onChange={(e) => setNewItem({ ...newItem, skin_color: e.target.value })}
                    />
                </div>
                <div className="col-auto">
                    <button className="btn btn-success" onClick={addItem}>
                        Add
                    </button>
                </div>
            </div>

            <div className="row mb-3 justify-content-end">
                <div className="col-6">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search items"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={searchItems}>
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Height</th>
                        <th>Mass</th>
                        <th>Hair Color</th>
                        <th>Skin Color</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.height}</td>
                            <td>{item.mass}</td>
                            <td>{item.hair_color}</td>
                            <td>{item.skin_color}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => deleteItem(item.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
