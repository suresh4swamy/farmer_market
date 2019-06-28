import React, { Component } from 'react';
import TextInput from "../Common/textInput";
import DropDown from "../Common/dropDrown";
import RadioOption from "../Common/radioOption";
import ProfilePicture from "../Common/ProfilePic/profilePic";

class PersonalDetails extends Component {
    profilePic = React.createRef();
    state = {
        userDetails: {
            name: "",
            address: "",
            state: "IN-TN",
            profileType: "customer",
            phone: "",
            email: "",
            password: "",
            password_retype: ""
        },
        statesList: [
            { id: "IN-AP", name: "Andhra Pradesh" },
            { id: "IN-AR", name: "Arunachal Pradesh" },
            { id: "IN-AS", name: "Assam" },
            { id: "IN-BR", name: "Bihar" },
            { id: "IN-CT", name: "Chhattisgarh" },
            { id: "IN-GA", name: "Goa" },
            { id: "IN-GJ", name: "Gujarat" },
            { id: "IN-HR", name: "Haryana" },
            { id: "IN-HP", name: "Himachal Pradesh" },
            { id: "IN-JK", name: "Jammu and Kashmir" },
            { id: "IN-JH", name: "Jharkhand" },
            { id: "IN-KA", name: "Karnataka" },
            { id: "IN-KL", name: "Kerala" },
            { id: "IN-MP", name: "Madhya Pradesh" },
            { id: "IN-MH", name: "Maharashtra" },
            { id: "IN-MN", name: "Manipur" },
            { id: "IN-ML", name: "Meghalaya" },
            { id: "IN-MZ", name: "Mizoram" },
            { id: "IN-NL", name: "Nagaland" },
            { id: "IN-OR", name: "Odisha" },
            { id: "IN-PB", name: "Punjab" },
            { id: "IN-RJ", name: "Rajasthan" },
            { id: "IN-SK", name: "Sikkim" },
            { id: "IN-TN", name: "Tamil Nadu" },
            { id: "IN-TG", name: "Telangana" },
            { id: "IN-TR", name: "Tripura" },
            { id: "IN-UT", name: "Uttarakhand" },
            { id: "IN-UP", name: "Uttar Pradesh" },
            { id: "IN-WB", name: "West Bengal" },
            { id: "IN-AN", name: "Andaman and Nicobar Islands" },
            { id: "IN-CH", name: "Chandigarh" },
            { id: "IN-DN", name: "Dadra and Nagar Haveli" },
            { id: "IN-DD", name: "Daman and Diu" },
            { id: "IN-DL", name: "Delhi" },
            { id: "IN-LD", name: "Lakshadweep" },
            { id: "IN-PY", name: "Puducherry" }
        ],
        profileTypes: [
            { id: "farmer", name: "Farmer" },
            { id: "customer", name: "Customer" }
        ]
    }

    handleSubmit = (val) => {
        console.log(val)
    }

    handleChange = ({ currentTarget: { name, value } }) => {
        let userDetails = { ...this.state.userDetails };
        userDetails[name] = value;
        this.setState({ userDetails });
    }

    handleProfilePicChange = evt => {
        console.log(this.profilePic)
    }

    render() {
        const { name, address, state, profileType, phone, email, password, password_retype } = this.state.userDetails;
        const { statesList, profileTypes } = this.state;

        return (<form style={{ "maxWidth": "400px", "padding": "20px" }} onSubmit={this.handleSubmit}>
            <ProfilePicture />
            <TextInput name="name" label="Name" value={name} onChange={this.handleChange} />
            <TextInput name="address" label="Address" value={address} onChange={this.handleChange} />
            <DropDown name="state" label="Select State" value={state} data={statesList} onChange={this.handleChange} />
            <TextInput name="phone" label="Phone number" value={phone} onChange={this.handleChange} type="number" />
            <TextInput name="email" label="Email Id" value={email} onChange={this.handleChange} type="email" />
            <RadioOption name="profileType" label="Profile Type" value={profileType} data={profileTypes} onChange={this.handleChange} />
            <TextInput name="password" label="Password" value={password} onChange={this.handleChange} type="password" />
            <TextInput name="password_retype" label="Re-type Password" value={password_retype} onChange={this.handleChange} type="password" />
            <button type="submit" className="btn btn-primary">Save</button>
        </form>);
    }
}

export default PersonalDetails;



