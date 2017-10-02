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

ActiveRecord::Schema.define(version: 20171002083752) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "deleted_at"
    t.index ["deleted_at"], name: "index_admins_on_deleted_at", using: :btree
    t.index ["email"], name: "index_admins_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true, using: :btree
  end

  create_table "course_schedules", force: :cascade do |t|
    t.date     "start_date"
    t.date     "end_date"
    t.date     "deadline_date"
    t.integer  "day1"
    t.time     "start_time1"
    t.time     "end_time1"
    t.integer  "day2"
    t.time     "start_time2"
    t.time     "end_time2"
    t.integer  "day3"
    t.time     "start_time3"
    t.time     "end_time3"
    t.integer  "course_id"
    t.string   "slug",          null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.text     "place"
    t.string   "code"
    t.datetime "deleted_at"
    t.index ["course_id"], name: "index_course_schedules_on_course_id", using: :btree
    t.index ["deleted_at"], name: "index_course_schedules_on_deleted_at", using: :btree
    t.index ["slug"], name: "index_course_schedules_on_slug", unique: true, using: :btree
  end

  create_table "courses", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.text     "content"
    t.float    "cost"
    t.string   "slug",                            null: false
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.string   "technique"
    t.boolean  "on_slider_index", default: false
    t.integer  "avatar_id"
    t.integer  "cover_id"
    t.boolean  "display_cost",    default: false
    t.datetime "deleted_at"
    t.index ["deleted_at"], name: "index_courses_on_deleted_at", using: :btree
    t.index ["slug"], name: "index_courses_on_slug", unique: true, using: :btree
  end

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer  "priority",   default: 0, null: false
    t.integer  "attempts",   default: 0, null: false
    t.text     "handler",                null: false
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["priority", "run_at"], name: "delayed_jobs_priority", using: :btree
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

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string   "slug",                      null: false
    t.integer  "sluggable_id",              null: false
    t.string   "sluggable_type", limit: 50
    t.string   "scope"
    t.datetime "created_at"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true, using: :btree
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type", using: :btree
    t.index ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id", using: :btree
    t.index ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type", using: :btree
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
    t.integer  "admin_id"
    t.string   "slug",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["admin_id"], name: "index_news_on_admin_id", using: :btree
    t.index ["slug"], name: "index_news_on_slug", unique: true, using: :btree
  end

  create_table "registrations", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "phone"
    t.text     "address"
    t.integer  "course_schedule_id"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.datetime "deleted_at"
    t.index ["course_schedule_id"], name: "index_registrations_on_course_schedule_id", using: :btree
    t.index ["deleted_at"], name: "index_registrations_on_deleted_at", using: :btree
  end

  create_table "temporary_registrations", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "phone"
    t.text     "address"
    t.integer  "course_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "deleted_at"
    t.index ["course_id"], name: "index_temporary_registrations_on_course_id", using: :btree
    t.index ["deleted_at"], name: "index_temporary_registrations_on_deleted_at", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.integer  "role"
    t.text     "quote"
    t.string   "slug",                      null: false
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.text     "introduction"
    t.string   "position"
    t.integer  "display_order", default: 0
    t.datetime "deleted_at"
    t.index ["deleted_at"], name: "index_users_on_deleted_at", using: :btree
    t.index ["slug"], name: "index_users_on_slug", unique: true, using: :btree
  end

  add_foreign_key "course_schedules", "courses"
  add_foreign_key "news", "admins"
  add_foreign_key "registrations", "course_schedules"
  add_foreign_key "temporary_registrations", "courses"
end
