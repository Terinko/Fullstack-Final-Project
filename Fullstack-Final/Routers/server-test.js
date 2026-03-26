const mongoose = require('mongoose');

// Adjust these paths if your model files are in a different folder.
const Faculty = require('./facultyRouter');
const Student = require('./studentRouter');
const Course = require('./courseRouter');
const Lecture = require('./lectureRouter');

function validationError(doc) {
  return doc.validateSync();
}

function fieldError(doc, fieldName) {
  const err = validationError(doc);
  return err && err.errors ? err.errors[fieldName] : undefined;
}

describe('Mongoose schema tests', function () {
  afterAll(async function () {
    await mongoose.disconnect();
  });

  describe('Faculty schema', function () {
    it('accepts a valid faculty document', function () {
      const faculty = new Faculty({
        qu_email: 'Professor@Test.edu',
        first_name: 'Alan',
        last_name: 'Turing',
        password_hash: 'hashed_password_123',
        department: 'Computer Science',
        bio: 'Teaches software engineering.',
        course_ids: [new mongoose.Types.ObjectId()],
      });

      const err = validationError(faculty);
      expect(err).toBeUndefined();
      expect(faculty.qu_email).toBe('professor@test.edu');
      expect(faculty.is_admin).toBeFalse();
    });

    it('rejects faculty with missing required fields', function () {
      const faculty = new Faculty({});

      expect(fieldError(faculty, 'qu_email')).toBeDefined();
      expect(fieldError(faculty, 'first_name')).toBeDefined();
      expect(fieldError(faculty, 'last_name')).toBeDefined();
      expect(fieldError(faculty, 'password_hash')).toBeDefined();
    });

    it('rejects first_name longer than 100 characters', function () {
      const faculty = new Faculty({
        qu_email: 'faculty@test.edu',
        first_name: 'A'.repeat(101),
        last_name: 'Smith',
        password_hash: 'hashed_password_123',
      });

      expect(fieldError(faculty, 'first_name')).toBeDefined();
    });
  });

  describe('Student schema', function () {
    it('accepts a valid student document', function () {
      const student = new Student({
        qu_email: 'Student.test@quinnipiac.edu',
        first_name: 'Tyler',
        last_name: 'Rinko',
        password_hash: 'hashed_password_456',
        section_ids: [new mongoose.Types.ObjectId()],
      });

      const err = validationError(student);
      expect(err).toBeUndefined();
      expect(student.qu_email).toBe('Student.test@quinnipiac.edu');
      expect(student.major).toBe('');
    });

    it('rejects student with missing required fields', function () {
      const student = new Student({});

      expect(fieldError(student, 'qu_email')).toBeDefined();
      expect(fieldError(student, 'first_name')).toBeDefined();
      expect(fieldError(student, 'last_name')).toBeDefined();
      expect(fieldError(student, 'password_hash')).toBeDefined();
    });

    it('rejects last_name longer than 100 characters', function () {
      const student = new Student({
        qu_email: 'Student.test@quinnipiac.edu',
        first_name: 'Ryan',
        last_name: 'Seely'.repeat(101),
        password_hash: 'hashed_password_789',
      });

      expect(fieldError(student, 'last_name')).toBeDefined();
    });
  });

  describe('Course schema', function () {
    it('accepts a valid course document', function () {
      const course = new Course({
        name: 'Full Stack Development',
        code: 'CS 375',
        faculty_id: new mongoose.Types.ObjectId(),
      });

      const err = validationError(course);
      expect(err).toBeUndefined();
    });

    it('rejects course with missing required fields', function () {
      const course = new Course({});

      expect(fieldError(course, 'name')).toBeDefined();
      expect(fieldError(course, 'code')).toBeDefined();
      expect(fieldError(course, 'faculty_id')).toBeDefined();
    });
  });

  describe('Lecture schema', function () {
    function makeValidLecture(overrides = {}) {
      return new Lecture({
        title: 'Introduction to Node.js',
        lecture_number: 1,
        section_id: new mongoose.Types.ObjectId(),
        clarity_rating: 4,
        pace: 'Just Right',
        ...overrides,
      });
    }

    it('accepts a valid lecture document', function () {
      const lecture = makeValidLecture();
      const err = validationError(lecture);

      expect(err).toBeUndefined();
      expect(lecture.suggestion).toBe('');
      expect(lecture.date instanceof Date).toBeTrue();
    });

    it('rejects lecture with missing required fields', function () {
      const lecture = new Lecture({});

      expect(fieldError(lecture, 'title')).toBeDefined();
      expect(fieldError(lecture, 'lecture_number')).toBeDefined();
      expect(fieldError(lecture, 'section_id')).toBeDefined();
      expect(fieldError(lecture, 'clarity_rating')).toBeDefined();
      expect(fieldError(lecture, 'pace')).toBeDefined();
    });

    it('rejects clarity_rating below 1', function () {
      const lecture = makeValidLecture({ clarity_rating: 0 });
      expect(fieldError(lecture, 'clarity_rating')).toBeDefined();
    });

    it('rejects clarity_rating above 5', function () {
      const lecture = makeValidLecture({ clarity_rating: 6 });
      expect(fieldError(lecture, 'clarity_rating')).toBeDefined();
    });

    it('rejects pace values outside the enum', function () {
      const lecture = makeValidLecture({ pace: 'Fast' });
      expect(fieldError(lecture, 'pace')).toBeDefined();
    });
  });

  describe('Schema configuration', function () {
    it('uses timestamps for all uploaded schemas', function () {
      expect(Faculty.schema.options.timestamps).toBeTrue();
      expect(Student.schema.options.timestamps).toBeTrue();
      expect(Course.schema.options.timestamps).toBeTrue();
      expect(Lecture.schema.options.timestamps).toBeTrue();
    });
  });
});

/*
Run with:
npm install jasmine mongoose --save-dev
npx jasmine server-test.js
*/