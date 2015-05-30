name "vagrant-test-box"

run_list(
    "recipe[apt]",
    "recipe[utils]"
)
