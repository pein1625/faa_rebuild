require "ffaker"

10.times do
  Certification.create! name: FFaker::Name.name, description: FFaker::Lorem.sentence
end
