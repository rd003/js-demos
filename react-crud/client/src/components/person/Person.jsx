import { useForm } from "react-hook-form";
import PersonForm from "./PersonForm"
import PersonList from "./PersonList"
import { useState, useEffect } from 'react';
import { getPeople, addPerson, updatePerson, deletePerson } from '../../services/person.service'
import toast from 'react-hot-toast';

function Person() {
    const [people, setPeople] = useState([]);
    const [editData, setEditData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        methods.reset(editData)
    }, [editData])

    useEffect(() => {
        const loadPeople = async () => {
            try {
                const peopleList = await getPeople();
                setPeople(peopleList);
            } catch (error) {
                console.log(error);
                toast.error('Error occured!')
            }
            finally {
                setLoading(false);
            }
        }

        loadPeople();
    }, []);

    const defaultFormValues = {
        id: 0,
        firstName: '',
        lastName: '',
        age: 0
    };

    const methods = useForm({
        defaultValues: defaultFormValues
    });

    const onSubmit = async (person) => {
        setLoading(true);
        try {
            if (!person) return;
            if (person.id < 1) {
                // add 
                const createdPerson = await addPerson(person);
                setPeople((prevPeople) => [...prevPeople, createdPerson]);
            }
            else {
                await updatePerson(person);
                setPeople((prevPeople) => prevPeople.map(p => p.id === person.id ? person : p));
            }
            toast.success('Saved successfully!!');
            onFormReset();
        } catch (error) {
            console.log(error);
            toast.error('Error occured!')
        }
        finally {
            // set loading false
            setLoading(false);
        }
    }

    const onFormReset = () => {
        console.log("clicked");
        methods.reset(defaultFormValues);
    }

    const onEdit = (person) => {
        setEditData(person);
    }
    const onDelete = async (person) => {
        if (!confirm(`Are you sure delete data with name: ${person.firstName} ${person.lastName}`)) return;
        setLoading(true);
        try {
            await deletePerson(person.id);
            setPeople((prevPeople) => prevPeople.filter(p => p.id !== person.id));
            toast.success('Deleted successfully!!');
        } catch (error) {
            console.log(error);
            toast.error('Error occured!')
        }
        finally {
            // set loading false
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Person Management
                    </h1>

                    {loading && <p>Loading...</p>}
                </div>

                <PersonForm methods={methods} onFormSubmit={onSubmit} onFormReset={onFormReset} />
                <PersonList personList={people} onEdit={onEdit} onDelete={onDelete} />
            </div>
        </div>
    )
}

export default Person