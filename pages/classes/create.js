import ClassForm from '../../components/ClassForm';

const CreateClassPage = () => {
  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/classes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Class created successfully');
      } else {
        alert('Failed to create class');
      }
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  return (
    <div>
      <h1>Create New Class</h1>
      <ClassForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateClassPage;
