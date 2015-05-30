package 'apache2'

service 'apache2' do
    action [:start, :enable]
end

include_recipe 'git'

execute "make folder" do
    command "mkdir dev_dir"
    action :run
end

execute "git" do
    command "git clone https://github.com/raymondhoagland/Parking_App.git"
    cwd "dev_dir"
    action :run
end

