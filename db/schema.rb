# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170619042817) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "certifications", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "course_categories", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "course_techniques", force: :cascade do |t|
    t.integer  "course_id"
    t.integer  "technique_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["course_id"], name: "index_course_techniques_on_course_id", using: :btree
    t.index ["technique_id"], name: "index_course_techniques_on_technique_id", using: :btree
  end

  create_table "courses", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.text     "content"
    t.date     "start_date"
    t.date     "end_date"
    t.date     "registration_deadline"
    t.float    "cost"
    t.text     "place"
    t.text     "schedule"
    t.integer  "status"
    t.integer  "course_category_id"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.index ["course_category_id"], name: "index_courses_on_course_category_id", using: :btree
  end

  create_table "feedbacks", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "phone"
    t.string   "subject"
    t.text     "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "images", force: :cascade do |t|
    t.string   "url"
    t.integer  "imageable_id"
    t.string   "imageable_type"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["imageable_type", "imageable_id"], name: "index_images_on_imageable_type_and_imageable_id", using: :btree
  end

  create_table "news", force: :cascade do |t|
    t.string   "title"
    t.text     "content"
    t.integer  "news_category_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.index ["news_category_id"], name: "index_news_on_news_category_id", using: :btree
  end

  create_table "news_categories", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "registrations", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "phone"
    t.text     "address"
    t.integer  "course_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_registrations_on_course_id", using: :btree
  end

  create_table "techniques", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "user_certifications", force: :cascade do |t|
    t.integer  "certification_id"
    t.integer  "user_id"
    t.date     "issued_date"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.index ["certification_id"], name: "index_user_certifications_on_certification_id", using: :btree
    t.index ["user_id"], name: "index_user_certifications_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.integer  "role"
    t.text     "quote"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "course_techniques", "courses"
  add_foreign_key "course_techniques", "techniques"
  add_foreign_key "courses", "course_categories"
  add_foreign_key "news", "news_categories"
  add_foreign_key "registrations", "courses"
  add_foreign_key "user_certifications", "certifications"
  add_foreign_key "user_certifications", "users"
end
