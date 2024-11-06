![image](https://github.com/user-attachments/assets/b45db768-a9e1-4e5a-a699-ddaeebedef2c)

---

# ZESTO - Video Conferencing App

This is a full-stack video conferencing application built using Next.js, Clerk, and Stream. The app offers real-time video conferencing with a host of features including user authentication, meeting scheduling, layout customization, and viewing recorded sessions. Clerk powers secure user management, while Stream enhances the app with high-quality video and audio capabilities.

## Its hosted 
  [www.zesto.com](https://zestocaller.vercel.app/)

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Usage Guide](#usage-guide)


---

## Features

- **User Authentication & Management**: Secure sign-in, registration, and user management through Clerk.
- **Video Conferencing**: Real-time video calls powered by Stream, supporting screen sharing, layout adjustments, and call controls.
- **Scheduling & Meeting Management**: Schedule and manage meetings, view upcoming sessions, and access recordings.
- **Recordings**: Easily record meetings and access saved sessions in a dedicated recordings section.
- **Responsive & Interactive UI**: Styled with Tailwind CSS for mobile responsiveness and interactivity across device sizes.
- **Reusable Components**: Components for meeting management (e.g., meeting cards, call lists) and layouts are modular and reusable.
- **Server-Side Security**: Secure server actions for token generation, enabling server-side authentication without additional backend frameworks.

---

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, shadCn UI
- **User Management**: Clerk for authentication and secure user management
- **Video & Audio**: Stream.io APIs for high-quality, real-time video conferencing

---

## Project Structure

- **Pages and Routing**: Next.js route groups and dynamic routing organize sections like `/meetings`, `/recordings`, and other functional components.
- **Components**: Modular components for call lists, meeting cards, navigation, and layouts.
- **Server Actions**: Custom server-side actions for secure token handling, located in a designated `actions` folder.
- **Hooks**: Custom hooks for fetching data, managing call states, and handling camera/microphone permissions.

---

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/video-conferencing-app.git
   cd video-conferencing-app
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Set Up Environment Variables**
   - Create a `.env.local` file in the root of the project.
   - Add the following variables, replacing `your_clerk_api_key` and `your_stream_api_key` with your actual keys.
     ```plaintext
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="YOUR KEY HERE"
     CLERK_SECRET_KEY="YOUR KEY HERE"
     NEXT_PUBLIC_CLERK_FRONTEND_API="YOUR API HERE"
     NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in  # Route for sign-in
     NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up # Route for sign-up
     NEXT_PUBLIC_STREAM_API_KEY="YOUR KEY HERE"
     STREAM_SECRET_KEY="YOUR KEY HERE"
     STREAM_APP_ID="YOUR KEY HERE"
     NEXT_PUBLIC_BASE_URL="YOUR KEY HERE"
     ```

4. **Run the Development Server**
   ```bash
   pnpm run dev
   ```
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Configuration

### Stream Setup

1. **Sign Up for Stream.io**: Create an account on [Stream.io](https://getstream.io/).
2. **Create an App**: Set up a new app in Stream's dashboard to obtain your `API_KEY`, `API_SECRET`, and `APP_ID`.
3. **Configure Permissions**: Enable user token generation for authenticated, secure streaming.

### Clerk Setup

1. **Sign Up for Clerk**: Create an account on [Clerk.dev](https://clerk.dev/).
2. **Configure Redirects**: Add redirect URLs for your development and production environments.
3. **Add API Keys**: Input Clerk’s API keys into your `.env.local` file as shown above.

---

## Usage Guide

### 1. User Authentication & Management
   - **Sign-Up/Login**: Users can sign up or log in via Clerk, which securely handles user sessions and authentication.
   - **User Management**: Manage profiles and account settings using Clerk’s pre-built components for a seamless experience.

### 2. Scheduling & Managing Meetings
   - **Schedule a Meeting**: Schedule meetings with date and time pickers, store them, and manage upcoming or past meetings in the call list.
   - **View Recordings**: Access recorded meetings in a dedicated section, with filters for upcoming, past, or recorded sessions.

### 3. Starting and Joining Video Calls
   - **Real-Time Video Conferencing**: Using Stream’s SDK, users can initiate and join meetings, complete with video, audio, and screen-sharing capabilities.
   - **Permissions**: The app requests necessary permissions (camera/microphone) when starting a meeting, ensuring a seamless user experience.
   - **Customizable Layouts**: Choose between different layouts (e.g., gallery or speaker view) with dynamic controls for toggling views.

### 4. Interactive Call Controls
   - **Call Controls**: During meetings, users have access to controls for muting/unmuting, enabling/disabling video, screen sharing, and ending the call.
   - **Screen Sharing**: Stream allows users to share their screens, enabling collaboration and enhancing the meeting experience.

### 5. Recording & Playback
   - **Recording Calls**: Meetings can be recorded and saved for future reference.
   - **Playback Controls**: Access recordings, replay specific parts, and download sessions if necessary.

### 6. Responsive Layout & Reusable Components
   - **Mobile Navigation**: A mobile-friendly navigation bar enhances the app's accessibility across all devices.
   - **Reusable Components**: Modular components make it easy to add new functionality or reformat sections of the app.

---
