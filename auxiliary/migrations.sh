# Create migration
yarn typeorm migration:create -n CreateAppointments

# Run migration
yarn typeorm migration:run

# Undo migration
yarn typeorm migration:revert

# show migrations
yarn typeorm migration:show
