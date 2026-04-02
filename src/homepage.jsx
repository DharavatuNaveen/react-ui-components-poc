import React from 'react';
import './homepage.css';
import Button from './UI-Components/Button';
import Input from './UI-Components/Input';
import Select from './UI-Components/Select';
import Spinner from './UI-Components/Spinner';

function HomePage() {
  return (
    <div className="home-container">
      <div className="home-hero-section">
        <h1>Enterprise UI Components</h1>
        <p>A beautiful, modern showcase of all available UI platform components.</p>
      </div>

      <div className="home-components-grid">
        <div className="home-card">
          <h2>Buttons</h2>
          <div className="home-component-group">
            <Button variant="primary" size="medium">Click me</Button>
            <Button variant="secondary">Cancel</Button>
            <Button variant="danger">Delete</Button>
            <Button variant="ghost">Learn more</Button>

            {/* Loading state */}
            <Button loading={true}>Saving...</Button>

            {/* Disabled */}
            <Button disabled={true}>Not available</Button>

            {/* With icon slot abstraction */}
            <Button variant="primary" icon="🔍">
              Search
            </Button>
          </div>
        </div>

        <div className="home-card">
          <h2>Inputs</h2>
          <div className="home-component-group vertical">
            {/* Basic */}
            <Input label="Full name" placeholder="Jane Doe" />

            {/* With validation */}
            <Input
              label="Email"
              type="email"
              required={true}
              error="Please enter a valid email"
            />

            {/* Success state */}
            <Input
              label="Username"
              value="jdoe"
              success="Username is available"
            />

            {/* With character count */}
            <Input
              label="Bio"
              maxlength="160"
              helper="Tell us about yourself"
            />

            {/* With prefix/suffix slots via React prop */}
            <Input
              label="Search"
              placeholder="Search vendors..."
              prefixIcon="🔍"
            />

            {/* Sizes */}
            <Input size="small" placeholder="Small" />
            <Input size="large" placeholder="Large" />
          </div>
        </div>

        <div className="home-card">
          <h2>Selects</h2>
          <div className="home-component-group vertical">
            {/* Basic */}
            <Select
              label="Country"
              placeholder="Select country"
              options={[
                { value: 'us', label: 'United States' },
                { value: 'uk', label: 'United Kingdom' },
                { value: 'in', label: 'India' },
              ]}
            />

            {/* Searchable */}
            <Select
              label="Vendor"
              searchable={true}
              options={[
                { value: 'v1', label: 'Vendor 1' },
                { value: 'v2', label: 'Vendor 2' }
              ]}
            />

            {/* Multi-select */}
            <Select
              label="Tags"
              multiple={true}
              options={[
                { value: 'tag1', label: 'Tag 1' },
                { value: 'tag2', label: 'Tag 2' }
              ]}
            />

            {/* Grouped options */}
            <Select
              label="Category"
              options={[
                { value: 'react', label: 'React', group: 'Frontend' },
                { value: 'vue', label: 'Vue', group: 'Frontend' },
                { value: 'node', label: 'Node.js', group: 'Backend' },
              ]}
            />

            {/* With validation */}
            <Select
              label="Role"
              required={true}
              error="Please select a role"
              options={[
                { value: 'admin', label: 'Admin' },
                { value: 'user', label: 'User' },
              ]}
            />
          </div>
        </div>

        <div className="home-card loading-card">
          <h2>Loading & Status</h2>
          <div className="home-component-group">
            <Spinner />
            <Spinner size="small" label="" />
            <Spinner size="large" label="Loading vendors..." />
            <Spinner color="#6200ea" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
