## About This Project

A registration form with real-time client-side validation using vanilla JavaScript. The form validates user input instantly, displays error messages, and prevents submission until all fields meet validation criteria.

**Key Features:**
- Real-time field validation (as you type and when you leave fields)
- Email format validation with regex
- Strong password requirements (8+ chars, uppercase, lowercase, numbers, special chars)
- Password matching validation
- Visual feedback (red borders for errors, green for valid input)
- Prevents form submission on invalid input

---

## How to Run

1. **Download or clone the project**
   ```bash
   git clone <repository-url>
   cd form-validation
   ```

2. **Open the form in your browser**
   - Simply open `index.html` in any modern web browser
   - No installation or dependencies required

3. **Test the validation**
   - Try leaving fields empty → see error messages
   - Try entering "test@email" → see email format error
   - Try entering "weak" as password → see password strength errors
   - Fill all fields correctly → see green borders and form submits successfully

---

## Project Files

- **index.html** - Form structure with 5 input fields
- **style.css** - Modern styling with error/valid state styling
- **script.js** - Validation logic with real-time feedback

---

## Validation Rules

| Field | Requirements |
|-------|--------------|
| Name | Min 3 characters |
| Email | Valid email format (user@domain.com) |
| Password | 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special char |
| Confirm Password | Must match password field |
| Message | Min 10 characters |

---

## Valid Test Input

```
Name: Ming
Email: john@example.com
Password: Test@12345
Confirm: Test@12345
Message: This is a test message for validation.
```

---

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

**No dependencies needed - uses vanilla JavaScript!**
