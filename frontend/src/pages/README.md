# User Profile Page

A modern, elegant user profile page with view and edit functionality. Built with modularity and testability in mind.

## 🎨 Features

- **Modern Design**: Gradient backgrounds, glassmorphism effects, and smooth animations
- **View/Edit Modes**: Toggle between viewing and editing profile information
- **Modular Components**: Separated into reusable, testable components
- **Form Validation**: Client-side validation for required fields
- **Responsive Layout**: Works beautifully on all screen sizes
- **Dark Mode Support**: Automatic adaptation to light/dark themes
- **Comprehensive Tests**: Full test coverage for all components

## 📁 File Structure

```
frontend/src/
├── pages/
│   ├── ProfilePage.tsx           # Main profile page component
│   └── ProfilePage.test.tsx      # Profile page tests
│
└── components/profile/
    ├── ProfileHeader.tsx         # User avatar and header
    ├── ProfileForm.tsx           # Editable profile form
    ├── ProfileForm.test.tsx      # Form component tests
    └── ProfileStats.tsx          # User statistics cards
```

## 🧩 Components

### ProfilePage
Main page component that orchestrates the profile view.

**Features**:
- Authentication check
- Edit mode state management
- Background decorations
- Back navigation

**Props**: None (uses hooks for state)

### ProfileHeader
Displays user avatar, name, and edit toggle.

**Props**:
```typescript
{
  user: { name?: string; email?: string } | null;
  isEditing: boolean;
  onEditToggle: () => void;
}
```

**Features**:
- Avatar with initials fallback
- Edit mode indicator
- Gradient accent decoration

### ProfileForm
Handles profile information display and editing.

**Props**:
```typescript
{
  user: { name?: string; email?: string } | null;
  isEditing: boolean;
  onCancel: () => void;
  onSave: () => void;
}
```

**Features**:
- View/edit mode switching
- Form validation
- Cancel/Save actions
- Toast notifications

### ProfileStats
Displays user statistics in a card grid.

**Props**: None

**Features**:
- Member since date
- Last active status
- Account verification status
- Hover effects

## 🚀 Usage

### Basic Usage

```typescript
import { ProfilePage } from '@/pages/ProfilePage';

function App() {
  return <ProfilePage />;
}
```

### With Routing

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProfilePage } from '@/pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 🧪 Testing

All components have comprehensive test coverage:

```bash
# Run all tests
npm test

# Run profile tests only
npm test ProfilePage
npm test ProfileForm
```

### Test Coverage

**ProfilePage**:
- ✅ Shows login prompt when not authenticated
- ✅ Renders profile when authenticated
- ✅ Toggles edit mode
- ✅ Renders back button

**ProfileForm**:
- ✅ Renders in view mode
- ✅ Renders in edit mode
- ✅ Shows action buttons
- ✅ Handles cancel action
- ✅ Validates required fields
- ✅ Handles form submission
- ✅ Updates form data

## 🎯 Customization

### Styling

The profile page uses the same design system as the Hero component:

```typescript
// Background gradient
bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50
dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950/50

// Card styling
rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm
```

### Adding Fields

To add new profile fields, edit `ProfileForm.tsx`:

```typescript
<div className="space-y-2">
  <Label htmlFor="phone">Phone Number</Label>
  {isEditing ? (
    <Input
      id="phone"
      type="tel"
      value={formData.phone}
      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
    />
  ) : (
    <div className="rounded-lg border bg-muted/30 px-4 py-3">
      {user?.phone || "Not set"}
    </div>
  )}
</div>
```

### Connecting to API

Update the `handleSubmit` function in `ProfileForm.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    // Call your API
    await updateUserProfile(formData);
    toast.success("Profile updated successfully!");
    onSave();
  } catch (error) {
    toast.error("Failed to update profile");
  }
};
```

## 🎨 Design Principles

1. **Modularity**: Each component has a single responsibility
2. **Testability**: All components are easily testable
3. **Accessibility**: Proper labels, ARIA attributes, and keyboard navigation
4. **Responsiveness**: Mobile-first design approach
5. **Consistency**: Uses the same design tokens as other pages

## 📱 Responsive Breakpoints

```
Mobile:  < 640px  - Stacked layout
Tablet:  ≥ 640px  - Side-by-side elements
Desktop: ≥ 1024px - Full layout with max-width container
```

## ♿ Accessibility

- ✅ Semantic HTML structure
- ✅ Proper form labels
- ✅ Keyboard navigation
- ✅ ARIA attributes
- ✅ Focus indicators
- ✅ Screen reader friendly

## 🔐 Security Considerations

- Client-side validation (always validate on server too)
- Authentication check before rendering
- Sanitize user input before display
- Use HTTPS for API calls
- Implement CSRF protection

## 🚧 Future Enhancements

- [ ] Avatar upload functionality
- [ ] Password change section
- [ ] Two-factor authentication
- [ ] Account deletion
- [ ] Activity log
- [ ] Privacy settings
- [ ] Notification preferences

## 📚 Dependencies

- **React**: UI library
- **Radix UI**: Accessible components (Avatar)
- **Lucide React**: Icons
- **Sonner**: Toast notifications
- **Tailwind CSS**: Styling

## 💡 Tips

1. **Edit Mode**: Click "Edit Profile" to enter edit mode
2. **Validation**: All required fields are validated before submission
3. **Cancel**: Canceling resets the form to original values
4. **Toast**: Success/error messages appear as toast notifications
5. **Back Button**: Returns to previous page using browser history

---

**Need help?** Check the component source code for detailed implementation.
