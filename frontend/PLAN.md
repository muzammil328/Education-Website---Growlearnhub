# Plan

## Next
- frontend/src/app/(main)/(class)/class-9/books/page.tsx
- frontend/src/app/(main)/(class)/class-9/books/[subject]/page.tsx
- frontend/src/app/(main)/(class)/class-9/books/page.tsx

---

## Currently
- /register
- /login
- /forgot-password
- /otp-verification


---

## Done
- /class-9
- /class-10
- /class-11
- /class-12
- /vu
- /explore-topics
- /jobs-opportunities
- /blogs
- /about-us
- /contact-us
- /cookies-policy
- /privacy-policy
- /disclaimer
- /terms-and-conditions
- /faqs
- /user-experience
- /report-a-bug
- /request-feature
- /study-group
- /success-stories
- /books
- /date-sheet
- /mcqs
- /notes
- /online-test
- /pairing-scheme
- /past-paper
- /result




check existing and update name of api and model

fix use the current api and if not exist then create new

> here show the list of subject
- below list of subject show the mcqs in pagination only that class and subject
frontend/src/app/(main)/(class)/class-9/mcqs
- below list of subject show the sets (make api whihc hit and get only sets)  show in card set 1 set 2 only that class and subject
frontend/src/app/(main)/(class)/class-9/online-test/page.tsx

> here show the list of chapter
- below list of chapter show the mcqs in pagination only that class, subject and chapter
frontend/src/app/(main)/(class)/class-9/mcqs/[subject]/page.tsx
- below list of chapter show the sets (make api whihc hit and get only sets)  show in card set 1 set 2 only that class, subject and chapter
frontend/src/app/(main)/(class)/class-9/online-test/[subject]/page.tsx

> here show the list of heading
- below list of heading show the mcqs in pagination only that class, subject chapter and heading
frontend/src/app/(main)/(class)/class-9/mcqs/[subject]/[chapter]/page.tsx
- below list of heading show the sets (make api whihc hit and get only sets)  show in card set 1 set 2 only that class, subject, chapter and heading
frontend/src/app/(main)/(class)/class-9/online-test/[subject]/[chapter]/page.tsx

> here show the list of sub heading
- below list of sub heading show the mcqs in pagination only that class, subject chapter, heading and subheading
frontend/src/app/(main)/(class)/class-9/mcqs/[subject]/[chapter]/[Heading]/page.tsx
- below list of sub heading show the sets (make api whihc hit and get only sets)  show in card set 1 set 2 only that class, subject, chapter, heading and subheading
frontend/src/app/(main)/(class)/class-9/online-test/[subject]/[chapter]/[heading]/page.tsx

> here show single mcqs
frontend/src/app/live/[slug]/page.tsx

> here show mcqs when user click on subheading then show here 
frontend/src/app/live/mcqs/page.tsx

> here show online test when user click on set 1 then open here and load here
frontend/src/app/live/online-test/page.tsx

> here show the list of subjects and classes
frontend/src/app/(main)/mcqs/page.tsx
frontend/src/app/(main)/online-test/page.tsx

> here show the list of heading when user click from (main)/mcqs/page.tsx or (main)/online-test/page.tsx from subject click
frontend/src/app/(main)/mcqs/[heading]/page.tsx
frontend/src/app/(main)/online-test/[heading]/page.tsx

> here show the list of sub heading when user click from (main)/mcqs/[heading]/page.tsx or (main)/online-test/[heading]/page.tsx click
frontend/src/app/(main)/mcqs/[heading]/[subHeading]/page.tsx
frontend/src/app/(main)/online-test/[heading]/[subHeading]/page.tsx
