import React, { useState } from 'react';
import './App.css';
import 'ui-components-framework/dist/index.js';
import Button from './UI-Components/Button';
import Input from './UI-Components/Input';
import Select from './UI-Components/Select';
import Spinner from './UI-Components/Spinner';

function DemoForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    country: '',
    skills: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock API Submit
  const handleSubmit = (e) => {
    // Run Validation
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email Address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.role) newErrors.role = "Please select a job role";
    if (!formData.country) newErrors.country = "Please select a country";
    if (formData.skills.length === 0) newErrors.skills = "Please select at least one skill";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop submission
    }

    setErrors({});
    setIsSubmitting(true);
    setSuccess(false);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      // Clear success after 4 seconds
      setTimeout(() => setSuccess(false), 4000);
    }, 1500);
  };

  // State handlers that auto-clear errors when the user starts typing
  const clearError = (field) => setErrors(e => ({ ...e, [field]: null }));

  const handleNameInput = (e) => { setFormData(d => ({ ...d, fullName: e.detail.value })); clearError('fullName'); };
  const handleEmailInput = (e) => { setFormData(d => ({ ...d, email: e.detail.value })); clearError('email'); };
  const handleRoleChange = (e) => { setFormData(d => ({ ...d, role: e.detail.value })); clearError('role'); };
  const handleCountryChange = (e) => { setFormData(d => ({ ...d, country: e.detail.value })); clearError('country'); };
  const handleSkillsChange = (e) => { setFormData(d => ({ ...d, skills: e.detail.values || [] })); clearError('skills'); };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      role: '',
      country: '',
      skills: [],
    });
    setErrors({});
  };

  // Utility to generate syntax highlighted JSON for the live output
  const renderHighlightedJson = (obj) => {
    let json = JSON.stringify(obj, null, 2);
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const highlighted = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      let cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key'; // Property keys
        } else {
          cls = 'string'; // String values
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return `<span class="${cls}">${match}</span>`;
    });
    return { __html: highlighted };
  };

  return (
    <div className="demo-container">
      <div className="hero-section">
        <div className="tag">Live UI Components Demo</div>
        <h1>Interactive Web Components</h1>
      </div>

      <div className="demo-split">
        {/* Left Side: The Interactive Form */}
        <div className="card form-panel">
          <h2>Create User Profile</h2>

          <div className="form-group vertical">
            <Input
              label="Full Name"
              placeholder="e.g. Jane Doe"
              value={formData.fullName}
              onChange={handleNameInput}
              error={errors.fullName}
              required={true}
            />

            <Input
              type="email"
              label="Email Address"
              placeholder="jane.doe@company.com"
              value={formData.email}
              onChange={handleEmailInput}
              error={errors.email}
              required={true}
            />

            <Select
              label="Job Role"
              placeholder="Select your role"
              value={formData.role}
              onChange={handleRoleChange}
              error={errors.role}
              required={true}
              options={[
                { value: '', label: 'Select a role' },
                { value: 'swe', label: 'Software Engineer', group: 'Engineering' },
                { value: 'qa', label: 'QA Engineer', group: 'Engineering' },
                { value: 'design', label: 'Product Designer', group: 'Design' },
                { value: 'pm', label: 'Product Manager', group: 'Management' },
              ]}
            />

            <Select
              label="Country"
              placeholder="Select your country"
              value={formData.country}
              onChange={handleCountryChange}
              error={errors.country}
              required={true}
              options={[
                { value: '', label: 'Select a country' },
                { value: 'us', label: 'United States' },
                { value: 'ca', label: 'Canada' },
                { value: 'gb', label: 'United Kingdom' },
                { value: 'in', label: 'India' },
                { value: 'au', label: 'Australia' },
              ]}
            />

            <Select
              label="Technical Skills"
              placeholder="Select your skills"
              multiple={true}
              values={formData.skills}
              onChange={handleSkillsChange}
              error={errors.skills}
              required={true}
              options={[
                { value: 'react', label: 'React' },
                { value: 'vue', label: 'Vue' },
                { value: 'angular', label: 'Angular' },
                { value: 'node', label: 'Node.js' },
                { value: 'python', label: 'Python' },
                { value: 'ui', label: 'UI/UX Design' },
              ]}
            />

            <div className="submit-action" style={{ display: 'flex', gap: '16px' }}>
              <Button
                variant="secondary"
                size="large"
                disabled={isSubmitting}
                onClick={handleReset}
                type="button"
              >
                Reset
              </Button>

              <Button
                variant="primary"
                size="large"
                loading={isSubmitting}
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? 'Processing request...' : 'Save Profile'}
              </Button>
            </div>

            {success && (
              <div className="success-banner">
                <span className="icon">🚀</span>
                Profile successfully created in the system!
              </div>
            )}
          </div>
        </div>

        {/* Right Side: The Live Output Visualizer */}
        <div className="card output-panel">
          <div className="output-header">
            <h2>Live Form State</h2>
            <div className="pulse-indicator"></div>
          </div>

          <p className="output-desc">
            As you type or select options on the left, events are emitted from the Web Components and instantly captured into React Local State.
          </p>

          <pre
            className="output-json"
            dangerouslySetInnerHTML={renderHighlightedJson(formData)}
          />

          <div className="status-indicators">
            <div className={`status-pill ${isSubmitting ? 'active' : ''}`}>
              {isSubmitting && <Spinner size="small" color="#60a5fa" />}
              <span>API Status: {isSubmitting ? 'Transmitting JSON payload...' : 'Awaiting Input'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoForm;
